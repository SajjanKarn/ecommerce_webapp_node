const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const authoriseAdmin = require("../middlewares/CheckAdmin");

router
  .get("/admin/edit/account/:id", authoriseAdmin, (req, res) => {
    const { id } = req.params;

    Admin.findOne({ _id: id }, (err, foundResults) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!foundResults) {
        res.status(500).send("Something went wrong please try again later");
        return;
      }

      const { _id, username, password } = foundResults;

      res.render("editAdminAccounts", { id: _id, username, password });
    });
  })
  .post("/admin/edit/account/:id", authoriseAdmin, async (req, res) => {
    const { username, password, newPassword } = req.body;

    const result = await Admin.findOne({ _id: req.params.id });

    bcrypt.compare(password, result.password).then(function (result) {
      // if true then we will hash the password
      bcrypt.hash(newPassword, 10).then(function (hash) {
        // Store hash in your password DB.
        Admin.updateOne({ _id: req.params.id }, { username, password: hash })
          .then(() => {
            console.log("Account Updated successfully!");
            res.redirect("/admin/accounts");
          })
          .catch((err) => console.log(err));
      });
    });
  });

module.exports = router;
