import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: 'Name cannot be blank',
		},
		email: {
			type: String,
			required: 'Email cannot be blank',
			unique: true,
		},
		password: {
			type: String,
			required: 'Password cannot be blank',
			minlength: 6,
			maxlength: 64,
			trim: true,
		},
		stripeAccountId: '',
		stripeSeller: {},
		stripeSession: {},
	},
	{
		timestamps: true,
	}
);

UserSchema.pre('save', function (next) {
	let user = this;

	if (user.isModified('password')) {
		return bcrypt.hash(user.password, 12, function (error, hashedPassword) {
			if (error) return next(error);

			user.password = hashedPassword;

			return next();
		});
	} else {
		return next();
	}
});

UserSchema.methods.comparePasswords = function (password, next) {
	return bcrypt.compare(password, this.password, function (error, match) {
		if (error) return next(error, false);

		return next(null, match);
	});
};

const User = mongoose.model('User', UserSchema);

export default User;
