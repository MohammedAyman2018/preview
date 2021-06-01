const LocalStrategy = require('passport-local').Strategy,
	{ User } = require('../models/User'),
	bcrypt = require('bcryptjs'),
	JWT = require('jsonwebtoken');
require('dotenv');


module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
			// Match user
			await User.findOne({ email: email })
				.then(user => {
					if (!user) return done(null, false, { message: "لا يوجد حساب لهذا الإيميل." });
					else if (user.token !== null) {
						if (JWT.verify(user.token, process.env.secret) == user.email) {
							// Mathc password
							bcrypt.compare(password, user.password, (err, isMatch) => {
								if (err) throw err;
								if (isMatch) return done(null, user);
								else return done(null, false, { message: "كلمة السر غير صحيحة." })
							})
						};
					}
					else {
						// Mathc password
						bcrypt.compare(password, user.password, (err, isMatch) => {
							if (err) throw err;
							if (isMatch) return done(null, user);
							else return done(null, false, { message: "كلمة السر غير صحيحة." })
						})
					}

				})
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id)
	});

	passport.deserializeUser(async (id, done) => {
		await User.findById(id, (err, user) => {
			done(err, user)
		})
	});

}