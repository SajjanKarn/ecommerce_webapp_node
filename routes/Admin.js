const router = require("express").Router();
const authoriseAdmin = require("../middlewares/CheckAdmin");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

router
  .get("/admin", (req, res) => {
    if (!req.session.user) {
      res.render("login");
      return;
    }

    if (req.session.user.isAdmin) {
      res.redirect("/admin/panel");
      return;
    }
  })

  .get("/login", (req, res) => {
    res.render("login");
  })

  .post("/admin", async (req, res) => {
    const { username, password } = req.body;

    const userData = await Admin.findOne({ username });

    if (!userData) {
      res.send("Invalid username or password");
      return;
    }

    bcrypt.compare(password, userData.password).then((result) => {
      // result == true

      if (result) {
        req.session.user = {
          username: userData.username,
          isAdmin: true
        }
        res.redirect("/admin/panel")
      } else {
        res.send("Invalid username or password")
        return
      }


    });
  });

module.exports = router;
