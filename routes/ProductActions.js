const router = require("express").Router();
const Product = require("../models/Item");
const authoriseAdmin = require("../middlewares/CheckAdmin");
const fs = require("fs");

router
  .get("/admin/delete/product/:_id", authoriseAdmin, async(req, res) => {
    const { _id } = req.params;

    const product = await Product.findOne({_id});

    // wait to delete the documents

    fs.unlink(`./public/${product.image}`, (err) => {
        if (err) {
            console.log(err);
            return
        }

        console.log("Delted success");
        
    })


    Product.deleteOne({ _id })
      .then(() => {
        console.log("deleted Item successfully");
        res.redirect("/admin/products");
      })
      .catch((err) => console.log(err));
  })
  .get("/admin/edit/product/:_id", async(req, res) => {
    const { _id } = req.params;

    // and we will await for the respone i.e fetch data
    const product = await Product.findOne({_id});

    console.log(product)

    res.render("editProduct", {product})

  })

  .post("/admin/edit/product/:_id", async (req, res) => {
      const {productName, productPrice, productImage} = req.body;
      const {_id} = req.params;

      const result = await Product.updateOne({_id}, {name: productName, price: productPrice})

      if (result) {
          console.log("Update successfully")
          res.redirect("/admin/products")
      }

  })

module.exports = router;
