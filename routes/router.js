import express from "express";
const router = express.Router();
import aws from "aws-sdk";
var ses = new aws.SES({ region: "us-east-2" });

router.get("/upload", function (req, res) {
  res.send("/upload called successfully... from 1");
});

router.post("/email", function (req, res) {
  const { email, message, name } = req.body;
  console.log("req", req.body);
  sesTest("alexandre.caroussos.1@gmail.com", email, message, name)
    .then((val) => {
      console.log("got this back", val);
      res.send("Successfully Sent Email");
    })
    .catch((err) => {
      res.send("/error");

      console.log("There was an error!", err);
    });
});

function sesTest(emailTo, emailFrom, message, name) {
  var params = {
    Destination: {
      ToAddresses: [emailTo]
    },
    Message: {
      Body: {
        Text: { Data: "From Contact Form: " + name + "\n " + message }
      },

      Subject: {
           Data: "From: " + emailFrom 
        }
    },
    Source: "alexandre.caroussos.1@gmail.com"
  };

  return ses.sendEmail(params).promise();
}

export default router;