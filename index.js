require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
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


/**Setting Router */
app.get('/test', async (req, res) => {
    try {
        let city = 'portland';
        let results = {
            id: 1,
            name: "chandan",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
        }
        return res.status(200).json({ data: results });
    } catch (e) {
        return res.status(500).json({ errors: "err" });
    }
});

app.post('/search', async (req, res) => {
    try {
        if (!req.body.city) return res.status(200).json({ err: "city is missing" });
        let city = req.body.city;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
        request(url, function (err, response, body) {
            if (err) {
                return res.status(500).json({ errors: "Something Went Wrong Enter Coreect City" });
            } else {
                let weather = JSON.parse(body)
                return res.status(200).json({ data: weather });
            }
        });
    } catch (e) {
        return res.status(500).json({ errors: "Internal server error" });
    }
});

module.exports = app;