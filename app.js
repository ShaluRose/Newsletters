//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
  const firstN = req.body.first;
  const lastN = req.body.last;
  const mail = req.body.mail;

  const data = {
    members: [
      {
      email_address: mail,
      status: "subscribed",
      merge_fields: {
        FNAME: firstN,
        LNAME: lastN
      }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us4.api.mailchimp.com/3.0/lists/0b71cea354";

  const options ={
    method: "POST",
    auth: "shalini:bb7881daccf39fd3abbxxxxxxxxxxxxe-us4"
  };

  const request = https.request(url, options, function(response){

   if (response.statusCode === 200){
     res.sendFile(__dirname + "/success.html");
   }else{
     res.sendFile(__dirname + "/failure.html");
   }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

// API key
// bb7881daccf39fd3abb388086929767e-us4


// List Id
// 0b71cea354
