const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fbID: {
        type: String,
        default: null
    },
    goID: {
        type: String,
        default: null
    },
    phone_number: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: String,
        unique: true
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    orders: {
        type: [String],
        default: []
    },
    token: {
        type: String,
        default: null
    }
},
    { timestamps: { createdAt: 'created_at' } }
);

let User = mongoose.model('users', Schema)

function validate(user) {
    const userSchema = Joi.object({
        name: Joi.string().error(new Error('يجب إدخال اسمك')),
        phone_number: Joi.string(),
        fbID: Joi.string(),
        goID: Joi.string(),
        orders: Joi.array(),
        email: Joi.string().email().error(new Error('يجب إدخال بريد إلكتروني')),
        password: Joi.string().error(new Error('يجب إدخال كلمة سر')),
        password2: Joi.ref('password')
    });

    return userSchema.validate(user, {abortEarly: false});
};

module.exports.User = User;
module.exports.validate = validate; 