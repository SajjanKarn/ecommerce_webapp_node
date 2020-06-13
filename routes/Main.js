const router = require("express").Router();
const AdminSection = require("../models/About");
const nodemailer = require("nodemailer");
const Product = require("../models/Item");

router
  .get("/about", async(req, res) => {
    const allData = await AdminSection.find();
    res.render("about", {data: allData[0]});
  })
  .get("/shop", async (req, res) => {
    const getAllProduct = await Product.find();
    res.render("shop", { product: getAllProduct });
  })
  .get("/contact", (req, res) => {
    res.render("contact");
  })

  .post("/contact", (req, res) => {
    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.TO_EMAIL,
      subject,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send(
          "Thanks for getting touch with us! We will contact u very soon! :)"
        );
      }
    });
  });

module.exports = router;
