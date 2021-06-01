const { validate, User } = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const JWT = require('jsonwebtoken');
require('dotenv');

exports.create_admin = async (req, res) => {
    const { name, email, password } = req.body;
    const { error } = validate(req.body);
    if (error) console.log(error);

    let admin = new User({ name, email, password, token: null });

    // HASH PASSWORD
    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(admin.password, salt, async (err, hash) => {
        if (err) throw err;
        // SET PASSWORD TO HASHED
        admin.password = hash;
        admin.token = JWT.sign(admin.email, process.env.secret);
        // SAVE USER
        await admin.save().then(admin => res.send(admin)).catch(err => console.log(err));
    }))
};

exports.add_user = async (req, res) => {
    const { name, email, password, password2, phone_number } = req.body;
    const { error } = validate(req.body);
    if (error) {
        res.status(400).render('user/signUp', {
            name,
            email,
            phone_number,
            password,
            password2,
            error
        })
    } else {
        await User.findOne({ $or: [{ email: email }, { phone_number: phone_number }] })
            .then(async user => {
                if (user) {
                    res.status(400).render('user/signUp', {
                        name,
                        email,
                        phone_number,
                        password,
                        password2,
                        error: { message: "الإيميل لديه حساب بالفعل" }
                    })
                } else {
                    const newUser = new User({ name, email, phone_number, password });

                    // HASH PASSWORD
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) throw err;

                        // SET PASSWORD TO HASHED
                        newUser.password = hash;

                        // SAVE USER
                        await newUser.save()
                            .then(user => {
                                req.flash('success_msg', "تم تسجيل الحساب بنجاح, يمكنك تسجيل دخولك الآن.")
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    }))


                }
            });

    }
};

exports.login = async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = async (req, res) => {
    req.logOut();
    req.flash('success_msg', "تم تسجيل الخروج بنجاح, سنفتقدك.");
    res.redirect('/login');
}