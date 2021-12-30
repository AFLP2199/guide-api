const mongoose = require("mongoose");
const Joi = require("joi");

const pageSchema = new mongoose.Schema({
    pageTitle: { type: String, required: true },
    pageInfo: { type: String },
});

const Page = mongoose.model("Pages", pageSchema);

function validatePage(page) {
    const schema = Joi.object({
        pageTitle: Joi.string().min(3).required().label("Page title"),
        pageInfo: Joi.string().allow(null, "").required().label("Page info"),
    });
    return schema.validate(page);
}

exports.pageSchema = pageSchema;
exports.Page = Page;
exports.validatePage = validatePage;
