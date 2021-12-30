const express = require("express");
const guides = require("../routes/guides");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/guides", guides);
};
