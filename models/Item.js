const mongoose = require("mongoose");

const ItemSchmea = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Item", ItemSchmea);
