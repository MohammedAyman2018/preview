const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        maxlength: 255
    },
    more_images: {
        type: [String],
        required: true
    },
    brand: String,
    model: String,
    screen: String,
    color: String,
    ram: String,
    cpu: String,
    hardDisk: String,
    amount: {
        type: Number,
        default: 1,
    },
    price: {
        type: String,
        required: true
    },
    tags: [String],
    moreInfo: {
        type: String,
        default: "لا يوجد"
    },
    warranty: Number ,
    GPU: String
},
    { timestamps: { createdAt: 'created_at' } }
);

let Lap = mongoose.model('Laps', Schema)

function validate(lap) {
    const lapSchema = Joi.object({
        _id: Joi.string().optional(),
        title: Joi.string().max(255).required().replace(/-/gm, ' '),
        ram: Joi.string().allow('').optional(),
        brand: Joi.string().allow('').optional(),
        model: Joi.string().allow('').optional(),
        color: Joi.string().allow('').optional(),
        cpu: Joi.string().allow('').optional(),
        hardDisk: Joi.string().allow('').optional(),
        GPU: Joi.string().allow('').optional(),
        screen: Joi.string().allow('').optional(),
        moreInfo: Joi.string().allow('').optional(),
        price: Joi.string().required(),
        tags: Joi.string().allow('').optional(),
        amount: Joi.number().allow('').optional(),
        warranty: Joi.number().allow('').optional()
    });

    return lapSchema.validate(lap);
};

module.exports.Lap = Lap;
module.exports.validate = validate; 