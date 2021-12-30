const mongoose = require("mongoose");
const Joi = require("joi");

const guideSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    thumbnail: { type: String },
    content: [
        {
            pageTitle: { type: String, required: true },
            pageInfo: { type: String },
            _id: false,
        },
    ],
});

const Guide = mongoose.model("Guides", guideSchema);

function validateGuide(guide) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        desc: Joi.string().min(3).required(),
        thumbnail: Joi.string(),
        content: Joi.array().items(
            Joi.object({
                pageTitle: Joi.string().min(3).required().label("Page title"),
                pageInfo: Joi.string().allow(null, "").required().label("Page info"),
            })
        ),
    });
    return schema.validate(guide);
}

exports.Guide = Guide;
exports.validateGuide = validateGuide;
