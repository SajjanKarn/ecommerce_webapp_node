const router = require("express").Router();
const authorieAdmin = require("../middlewares/CheckAdmin");
const authoriseAdmin = require("../middlewares/CheckAdmin");
const Product = require("../models/Item");
const path = require("path");
const util = require("util");

router
  .get("/admin/products", authoriseAdmin, async (req, res) => {
    const allProducts = await Product.find();
    res.render("Products", { product: allProducts });
  })

  .get("/admin/products/new", authoriseAdmin, (req, res) => {
    res.render("postProduct");
  })

  .post("/admin/products/new", authoriseAdmin,async (req, res) => {
    const { productName, productPrice } = req.body;
    const file = req.files.productImage;
    const { name, size } = file;
    const extension = path.extname(name);

    if (size > 5000000) {
      res.send("Image must be less than 5 MB");
      return;
    }

    const md5 = file.md5;
    const URL = `/uploads/${md5}${extension}`;

    await util.promisify(file.mv)("./public/" + URL);

    console.log("Uploaded file successfully", URL);

    const newProduct = new Product({
      image: URL,
      name: productName,
      price: productPrice,
    });

    newProduct.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("New product created");
    });

    res.redirect("/admin/products");
  });

module.exports = router;
