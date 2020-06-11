const express = require("express");
const PORT = process.env.PORT || 3000;
const cookieSession = require("cookie-session");
const expressEJSLayout = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const Item = require("./models/Item");
const User = require("./models/User");
const Admin = require("./models/Admin");
const app = express();

// connection to mongodb is here.
db = mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// here we will check if the connection to mongodb was successful
mongoose.connection.on("connected", () => {
  console.log("Connection to mongodb was successful!");
});

// cookies session middlewares
app.use(
  cookieSession({
    keys: ["fksjlalkjfksdfkl"],
  })
);

// app middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(expressEJSLayout);

// routes middleware are here.
app.use(require("./routes/Index"));
app.use(require("./routes/Main"));
app.use(require("./routes/Admin"));
app.use(require("./routes/EditAdmin"));
app.use(require("./routes/AdminActions"));
app.use(require("./routes/CreateProducts"));
app.use(require("./routes/ProductActions"));

// server configuration are here.
app.listen(PORT, () => {
  console.log(`Server started listening on port : ${PORT}`);
});
