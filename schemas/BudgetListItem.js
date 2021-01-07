const { Schema, model } = require("mongoose");

const BucketListItemSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BucketListItem = model("BucketListItem", BucketListItemSchema);

module.exports = BucketListItem;
