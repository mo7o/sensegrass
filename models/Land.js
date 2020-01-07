const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const landSchema = new Schema({
  username: {
    type: String
  },
  lat: {
    type: Array
  },
  lng: {
    type: Array
  },
  polygonArea: {
    type: Number
  }
});

module.exports = mongoose.model("Land", landSchema);
