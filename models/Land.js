const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const landSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipcode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    geo: {
      lat: {
        type: String
      },
      lng: {
        type: String
      }
    }
  },
  area: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Land", landSchema);
