const router = require("express").Router();
const authoriseAdmin = require("../middlewares/CheckAdmin");
const Admin = require("../models/Admin");


router
  .get("/admin", (req, res) => {

    if (req.session.user && req.session.user.isAdmin) {
      res.redirect("/admin/panel")
    }

    res.render("login");
  })

  .get("/login", (req, res) => {
    res.render("login");
  })

  .post("/admin", (req, res) => {
    const { username, password } = req.body;
    Admin.findOne({ username }, (err, foundResult) => {
      if (err) {
        console.log(err);
        res.send("Something went wrong please try again later");
        res.redirect("/admin");
      }

      if (!foundResult) {
        res.send("Sorry Invalid username or password");
        return;
      }

      if (password === foundResult.password) {
        const { username } = foundResult;
        req.session.user = {
          username,
          isAdmin: true,
        };
        res.redirect("/admin/panel");
      } else {
        res.send("Invalid username or password");
        res.redirect("/admin");
      }
    });
  });

module.exports = router;
