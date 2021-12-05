import User from '../models/User';
import Stripe from 'stripe';
import queryString from 'query-string';

const stripe = Stripe(process.env.STRIPE_SECRET);

const createConnectAccount = async (req, res) => {
	const user = await User.findById(req.user.id).exec();

	// if user don't have stripe_account_id yet, create it.
	if (!user.stripe_account_id) {
		const account = await stripe.accounts.create({
			type: 'express',
		});

		user.stripe_account_id = account.id;

		user.save();
	}

	// create login link based on account id
	let accountLink = await stripe.accountLinks.create({
		account: user.stripe_account_id,
		refresh_url: process.env.STRIPE_REDIRECT_URL,
		return_url: process.env.STRIPE_REDIRECT_URL,
		type: 'account_onboarding',
	});

	// prefill info such as email
	accountLink = Object.assign(accountLink, {
		'stripe_user[email]': user.email || undefined,
	});

	let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;

	res.json(link);
};

const getAccountStatus = async (req, res) => {
	const user = await User.findById(req.user.id).exec();

	const account = await stripe.accounts.retrieve(user.stripe_account_id);

	const updatedUser = await User.findByIdAndUpdate(
		user._id,
		{
			stripe_seller: account,
		},
		{ new: true }
	)
		.select('-password')
		.exec();

	res.json(updatedUser);
};

export { createConnectAccount, getAccountStatus };
