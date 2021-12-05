import User from '../models/User';
import validateUserEmail from '../util/validateEmail';
import generateToken from '../util/generateToken';

const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		let errors = [];
		if (!name)
			errors.push({
				param: 'name',
				msg: 'Name cannot be blank.',
			});
		if (!email) {
			errors.push({
				param: 'email',
				msg: 'Email cannot be blank.',
			});
		} else if (!validateUserEmail(email)) {
			errors.push({
				param: 'email',
				msg: 'Invalid email address.',
			});
		}
		if (!password || password.length < 6)
			errors.push({
				param: 'password',
				msg: 'Password cannot be blank or should be at least 6 characters.',
			});

		let isUserExist = await User.findOne({ email }).exec();

		if (isUserExist)
			errors.push({
				msg: 'This email is already exist.',
			});

		if (errors.length) return res.status(400).json(errors);

		const user = new User({ name, email, password });

		await user.save();

		return res.json({
			token: generateToken(user._id),
			_id: user._id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		let user = await User.findOne({ email }).exec();

		let errors = [];
		if (!email) {
			errors.push({
				param: 'email',
				msg: 'Email cannot be blank.',
			});
		} else if (!validateUserEmail(email)) {
			errors.push({
				param: 'email',
				msg: 'Invalid email address.',
			});
		}
		if (!password || password.length < 6)
			errors.push({
				param: 'password',
				msg: 'Password cannot be blank or should be at least 6 characters.',
			});
		if (!user && validateUserEmail(email)) {
			errors.push({
				msg: 'This user does not exist.',
			});
		}

		if (errors.length) return res.status(400).json(errors);

		user &&
			user.comparePasswords(password, (error, match) => {
				if (!match || error) {
					errors.push({
						param: 'password',
						msg: 'Wrong password, please double check it out.',
					});

					return res.status(400).json(errors);
				} else {
					return res.json({
						token: generateToken(user._id),
						_id: user._id,
						name: user.name,
						email: user.email,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
						stripe_account_id: user.stripe_account_id,
						stripe_seller: user.stripe_seller,
						stripeSession: user.stripeSession,
					});
				}
			});
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

export { registerUser, loginUser };
