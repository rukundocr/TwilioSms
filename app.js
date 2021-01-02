const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.static('public'))
const port = process.env.PORT || 3000;
const AC_SSID = process.env.AC_SSID;
const AauthToken = process.env.AauthToken; // put here your auth token 
//const phone_number = "+12566854272";
console.log(AC_SSID)
const client = require('twilio')(AC_SSID, AauthToken);
app.get('/try',(req,res)=>{
    //console.log(req.body);
    res.send('app is running ');
})
app.post('/Send',(req,res)=>{
    console.log("request received");
client.messages.create({
    body:req.body.message,
    to:req.body.phone,
    from:"+12566854272"
}).then(response =>{
console.log(response);
res.json({
    message:`message sent to `,
    status:"Message sent"
})
})
.catch(error =>{
    console.log(error);
})


})
app.listen(port,()=>{
    console.log("app listening on port :3000");
})