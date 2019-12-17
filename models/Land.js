const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const landSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Land", landSchema);
