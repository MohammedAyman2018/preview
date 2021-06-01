const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user_phone: {
        type: String,
        required: true
    },
    lap_title: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    sent: {
        type: Boolean,
        default: false    
    },
    delivred: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: { createdAt: 'created_at' } }
);

let Order = mongoose.model('orders', Schema)

function validate(user) {
    const userSchema = Joi.object({
        name: Joi.string().error(new Error('يجب إدخال اسمك')),
        email: Joi.string().email().error(new Error('يجب إدخال بريد إلكتروني')),
        password: Joi.string().error(new Error('يجب إدخال كلمة سر')),
        password2: Joi.ref('password')
    });

    return userSchema.validate(user, { abortEarly: false });
};

module.exports.Order = Order;
// module.exports.validate = validate;