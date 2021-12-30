const mongoose = require("mongoose");
const Joi = require("joi");

const guideSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    content: { type: String },
});

const Guide = mongoose.model("Guides", guideSchema);

function validateGuide(guide) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        desc: Joi.string().min(3).required(),
        content: Joi.string().allow(null, ""),
    });

    return schema.validate(guide);
}

exports.Guide = Guide;
exports.validateGuide = validateGuide;
