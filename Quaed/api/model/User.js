const mongoose = require('mongoose');
const {wordSchema} = require('../model/Word');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 4
        },
        token: {
            type: String,
            default: null
        },
        bookmark: {
            words: {
                type: [String],
                default: null
            }
        }
    },
    { timestamps: { createdAt: 'created_at' } }
);

const User = mongoose.model('users', Schema);

function validate(user) {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return userSchema.validate(user)
};

module.exports.User = User;
module.exports.validate = validate;