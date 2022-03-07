import User from '../models/User';
import Hotel from '../models/Hotel';
import Order from '../models/Order';
import Stripe from 'stripe';
import queryString from 'query-string';
import generateToken from '../util/generateToken';

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

const updateDelayDays = async accountId => {
	const account = await stripe.accounts.update(accountId, {
		settings: {
			payouts: {
				schedule: {
					delay_days: 7,
				},
			},
		},
	});

	return account;
};

const getAccountStatus = async (req, res) => {
	const user = await User.findById(req.user.id).exec();

	const account = await stripe.accounts.retrieve(user.stripe_account_id);

	const updatedAccount = await updateDelayDays(account.id);
	const updatedUser = await User.findByIdAndUpdate(
		user._id,
		{
			stripe_seller: updatedAccount,
		},
		{ new: true }
	)
		.select('-password')
		.exec();

	res.json({
		token: generateToken(user._id),
		_id: user._id,
		name: updatedUser.name,
		email: updatedUser.email,
		createdAt: updatedUser.createdAt,
		updatedAt: updatedUser.updatedAt,
		stripe_account_id: updatedUser.stripe_account_id,
		stripe_seller: updatedUser.stripe_seller,
		stripeSession: updatedUser.stripeSession,
	});
};

const getAccountBalance = async (req, res) => {
	const user = await User.findById(req.user.id).exec();

	try {
		const balance = await stripe.balance.retrieve({
			stripeAccount: user.stripe_account_id,
		});

		return res.status(200).json(balance);
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

const payoutSetting = async (req, res) => {
	const user = await User.findById(req.user.id).exec();

	try {
		const loginLink = await stripe.accounts.createLoginLink(
			user.stripe_account_id,
			{
				redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
			}
		);

		return res.status(200).json(loginLink);
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

const getSessionId = async (req, res) => {
	try {
		const { hotelId } = req.body;

		const item = await Hotel.findById(hotelId).populate('createdBy').exec();

		const fee = (item.price * 20) / 100;

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					name: item.title,
					amount: Math.round(item.price * 100), // in cents
					currency: 'usd',
					quantity: 1,
				},
			],
			payment_intent_data: {
				application_fee_amount: Math.round(fee * 100), // in cents, too
				transfer_data: {
					destination: item.createdBy.stripe_account_id,
				},
			},
			success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
			cancel_url: process.env.STRIPE_CANCEL_URL,
		});

		await User.findByIdAndUpdate(
			req.user.id,
			{ stripeSession: session },
			{ new: true }
		).exec();

		return res.json({
			sessionId: session.id,
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

const stripeSuccess = async (req, res) => {
	try {
		const { hotelId } = req.body;
		const user = await User.findById(req.user.id).exec();

		if (!user.stripeSession) return;

		const session = await stripe.checkout.sessions.retrieve(
			user.stripeSession.id
		);

		if (session.payment_status === 'paid') {
			const isOrderExist = await Order.findOne({
				'session.id': session.id,
			}).exec();

			if (isOrderExist) {
				return res.json({ isSuccess: true });
			} else {
				await new Order({
					hotel: hotelId,
					session,
					orderedBy: user.id,
				}).save();

				// remove user's stripeSession
				await User.findByIdAndUpdate(
					user.id,
					{
						$set: {
							stripeSession: {},
						},
					},
					{ new: true }
				).exec();

				return res.json({ isSuccess: true });
			}
		}
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

export {
	createConnectAccount,
	getAccountStatus,
	getAccountBalance,
	payoutSetting,
	getSessionId,
	stripeSuccess,
};
