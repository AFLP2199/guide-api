const minify = require("html-minifier").minify;
const express = require("express");
const router = express.Router();
const { Guide, validateGuide } = require("../models/guide");

router.get("/", async (req, res) => {
    const guides = await Guide.find();
    res.send(guides);
});

router.post("/", async (req, res) => {
    const { error } = validateGuide(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    /*     const minifiedContent = minify(req.body.content, {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
    }); */

    const guide = new Guide({
        title: req.body.title,
        desc: req.body.desc,
        thumbnail: req.body.thumbnail,
        content: req.body.content,
    });

    await guide.save();

    res.send(guide);
});

router.put("/:id", async (req, res) => {
    // If invalid, return 400 - bad request
    const { error } = validateGuide(req.body);
    if (error) {
        // 400 bad request
        return res.status(400).send(error.details[0].message);
    }
    /* 
    const minifiedContent = minify(req.body.content, {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
    }); */

    const guide = await Guide.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            desc: req.body.desc,
            thumbnail: req.body.thumbnail,
            content: req.body.content,
        },
        {
            new: true,
        }
    );
    // Look up the guide, if not exist return 404
    if (!guide) {
        return res.status(404).send("The guide with the given ID was not found");
    }
    // Update guide and return
    res.send(guide);
});

router.delete("/:id", async (req, res) => {
    // Look up the guide, if not exist return 404
    const guide = await Guide.findByIdAndRemove(req.params.id);
    if (!guide) {
        return res.status(404).send("The guide with the given ID was not found");
    }

    // Return the deleted guide
    res.send(guide);
});

router.get("/:id", async (req, res) => {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
        return res.status(404).send("The guide with the given ID was not found");
    }
    res.send(guide);
});

router.get("/:id/:pageid", async (req, res) => {
    const guides = await Guide.findById(req.params.id);
    const page = guides.content[req.params.pageid];
    res.send(page);
});

module.exports = router;
