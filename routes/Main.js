const router = require("express").Router();
const Product = require("../models/Item")

router
  .get("/about", (req, res) => {
    res.render("about");
  })
  .get("/shop", async (req, res) => {
    const getAllProduct = await Product.find();
    console.log(getAllProduct)
    res.render("shop", {product: getAllProduct});
  })
  .get("/contact", (req, res) => {
    res.render("contact");
  });

module.exports = router;
