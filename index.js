require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require('request');
const app = express();

/**logging info */
const loggerMiddleware = (req, res, next) => {
    console.log(req.method + " " + req.path);
    next();
};

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "52428800" }));
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    next();
});
app.use(loggerMiddleware);

/**Setting Mongo Connection */
mongoose.connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
});

/**Setting Router */
var router = require("./routes/router");
app.use(router);

module.exports = app;