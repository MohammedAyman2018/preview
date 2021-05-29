const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 5,
        required: true
    },
    text: {
        type: String,
        minlength: 3, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comments: [Object]
},
    { timestamps: { createdAt: 'created_at' } }
);

const Post = mongoose.model('Articles', Schema);

function validate(post) {
    const postSchema = Joi.object({
        comments: Joi.array(),
        title: Joi.string().max(265).min(2),
        text: Joi.string().min(2),
        author: Joi.string().min(2),
        Oldtitle: Joi.string().max(265).min(2),
    });

    return postSchema.validate(post);
};

module.exports.Post = Post;
module.exports.validate = validate; 