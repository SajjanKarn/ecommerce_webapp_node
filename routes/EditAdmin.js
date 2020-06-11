const router = require("express").Router();
const Admin = require("../models/Admin");
const authoriseAdmin = require("../middlewares/CheckAdmin")

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
  .post(
    "/admin/edit/account/:id", authoriseAdmin,(req, res)=> {
      const { username, password } = req.body;

      Admin.updateOne({ _id: req.params.id }, { username, password }, (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("Update account successfully");
        res.redirect("/admin/accounts")
      });
    })

module.exports = router;
