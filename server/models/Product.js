const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
  },
  gid: {
    type: Number,
    required: "This field is required.",
    unique: true,
  },
  designer: {
    type: String,
    required: "This field is required.",
  },
  description: {
    type: String,
    // required: "This field is required.",
    // inrich: true,
  },
  description2: {
    type: String,
    // required: "This field is required.",
    // inrich: true,
  },
  ingredients: {
    type: Array,
    required: "This field is required.",
  },
  category: {
    type: String,
    enum: [
      "Denims",
      "Suits",
      "Sweater",
      "Intimates",
      "Outingwear",
      "Activwear",
    ],
    required: "This field is required.",
  },
  image1: {
    type: Array,
    required: "This field is required.",
  },
  image2: {
    type: Array,
    required: "This field is required.",
  },
  image3: {
    type: Array,
    required: "This field is required.",
  },
  image4: {
    type: Array,
    required: "This field is required.",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// recipeSchema.index({ name: "text", description: "text" });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model("Product", productSchema);
