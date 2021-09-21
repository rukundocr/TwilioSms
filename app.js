const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const bodyParser = require('body-parser');
// let's use it
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
//const port = process.env.PORT || 3001;
const AC_SSID = process.env.AC_SSID;
const AauthToken = process.env.AauthToken;
//const phone_number = "+12566854272";
const client = require('twilio')(AC_SSID, AauthToken);
app.get('/try', (req, res) => {
    //console.log(req.body);
    res.send('app is running ');
})
app.post('/Send', (req, res) => {
    console.log("request received");
    client.messages.create({
        body: req.body.message,
        to: req.body.phone,
        from: "+12674600383"
    }).then(response => {
        console.log(response);
        res.json({ response })
    })
        .catch(error => {
            console.log(error);
        })


})

app.post('/sensor', (req, res) => {
    let { temperature, co2, methane, level } = req.body;
    temperature = parseInt(temperature);
    co2 = parseInt(co2);
    methane = parseInt(methane);
    level = parseInt(level);
    if (level > 150) {
        setTimeout(alertLevel, 5000);
    }
    else if (co2 > 3000) {
        setTimeout(alertCo2, 5000);
    }
    else if (methane > 3000) {
        setTimeout(alertMethane, 5000);
    }
    function alertMethane() {
        client.messages.create({
            body: `Methane Level is High. CH4 concentration is: ${methane}`,
            to: "+250783289997",
            from: "+12674600383"
        }).then(response => {
            console.log(response);
            res.json({ response, message: "event triggered" })
        })
            .catch(error => {
                console.log(error);
            })
    }
    function alertCo2() {
        client.messages.create({
            body: `CO2 LEVEL IS High.Co2 concentration is: ${co2}`,
            to: "+250783289997",
            from: "+12674600383"
        }).then(response => {
            console.log(response);
            res.json({ response, message: "event triggered" })
        })
            .catch(error => {
                console.log(error);
            })
    }
    function alertLevel() {
        client.messages.create({
            body: `ikimteri gikenewe kuvidurwa. kigeze kuri cm: ${level}`,
            to: "+250783289997",
            from: "+12674600383"
        }).then(response => {
            console.log(response);
            res.json({ response, message: "event triggered" })
        })
            .catch(error => {
                console.log(error);
            })
    }


    //res.json({ message: "data received " })
})

module.exports = app;