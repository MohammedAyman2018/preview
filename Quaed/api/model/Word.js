const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    en_word: {
        type: String,
        unique: true,
        minlength: 2,
        required: true
    },
    en_mean: {
        type: String,
        minlength: 2,
        required: true
    },
    ar_word: {
        type: String,
        minlength: 2,
        required: true
    },
    ar_mean: {
        type: String,
        minlength: 2,
        required: true
    },
});

const Word = mongoose.model('words', Schema);

function validate(word) {
    const wordSchema = Joi.object({
        en_word: Joi.string().required(),
        en_mean: Joi.string().required(),
        ar_word: Joi.string().required(),
        ar_mean: Joi.string().required(),
    });

    return wordSchema.validate(word)
};

module.exports.Word = Word;
module.exports.wordSchema = Schema;
module.exports.validate = validate; 