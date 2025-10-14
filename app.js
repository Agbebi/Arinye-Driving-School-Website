const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const _ = require("lodash");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use('images', express.static(__dirname + '/images'));

app.get("/", function (req, res) {   
  const images = fs.readdirSync(path.join(__dirname, 'public/images/gallery'));

  res.render("Home", {images: images} );
});

app.post("/", function (req, res) {
  const eMail = req.body.eMail;
  const fName = _.upperFirst(req.body.fName);
  const lName = _.upperFirst(req.body.lName);
  const message = _.upperFirst(req.body.message);

  async function sendEmail() {
    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "agbebitimothy2000@gmail.com",
        pass: "ycgxzwfkfkadvecx"
      }
    });

    const mailOptions = {
      from: '"Agbebi Timothy" <agbebitimothy2000@gmail.com>',
      to: "jeremiahsunny601@gmail.com",
      subject: "Message from " + fName + " " + lName,
      html: "<b>First Name: " + fName + " <br>  Last Name: " + lName + " <br> e-Mail Address: " + eMail + " <br> Message: </b>" + message
    }

    try {
      const info = await transporter.sendMail(mailOptions);
 
    } catch (error) {
      console.error("Error sending Email:", error);
    }
  }

  sendEmail();
  res.redirect("/");   
});

app.listen(PORT, function () {
  console.log("Server started on port 3000");
});
