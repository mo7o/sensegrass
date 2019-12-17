const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const landSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String
  }
});

module.exports = mongoose.model("Land", landSchema);
