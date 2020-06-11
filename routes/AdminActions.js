const router = require("express").Router();
const authoriseAdmin = require("../middlewares/CheckAdmin");
const Admin = require("../models/Admin");

router
  .get("/admin/panel", authoriseAdmin, (req, res) => {
    const { isAdmin, username } = req.session.user;
    res.render("adminPanel", { isAdmin, username });
  })

  .get("/logout", (req, res) => {
    if (!req.session.user) {
      res.send("You need to be first logged In!");
      return;
    }
    if (req.session.user.isAdmin) {
      req.session.user = null;
      res.redirect("/admin");
    } else {
      req.session.user = null;
      res.redirect("/");
    }
  })

  .get("/admin/accounts", authoriseAdmin, (req, res) => {
    Admin.find({}, (err, foundResult) => {
      if (err) {
        console.log(err);
        res.redirect("/admin");
      }

      if (!foundResult) {
        res.send("something went wrong!");
        return;
      }
      res.render("adminAccounts", { adminAccounts: foundResult });
    });
  })

  .get("/admin/createaccounts", authoriseAdmin, (req, res) => {
    res.render("createAdminAccounts");
  })

  .get("/admin/delete/account/:id", authoriseAdmin, (req, res) => {
    Admin.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Successfully delted user from the database");
      res.redirect("/admin/accounts");
    });
  })

  .post("/admin/createaccounts", authoriseAdmin, async (req, res) => {
    const { username, password, checked } = req.body;

    console.log(username, password, checked);

    if (!checked) {
      res.send(
        "You should must check the add admin checkbox in order to create a admin accounts"
      );
    }

    const result = await Admin.findOne({ username });
    if (result) {
      res.send(
        "A user with that username already exits please use another username"
      );
      return;
    }

    const newAdminUser = new Admin({
      username,
      password,
    });

    newAdminUser
      .save()
      .then(() => console.log("Successfully added new Admin User"));

    res.redirect("/admin/panel");
  });

module.exports = router;
