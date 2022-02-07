require("../models/database");
const Product = require("../models/Product");

exports.home = (req, res) => {
  res.render("index");
};

exports.about = (req, res) => {
  res.render("about");
};

exports.studio = (req, res) => {
  res.render("studio");
};

exports.productDetails = (req, res) => {
  res.render("product-details");
};

exports.products = async (req, res) => {
  try {
    const denims = await Product.find({ category: "Denims" });
    const suits = await Product.find({ category: "Suits" });
    const sweater = await Product.find({ category: "Sweater" });
    const intimates = await Product.find({ category: "Intimates" });
    const activewear = await Product.find({ category: "Activewear" });
    const outingwear = await Product.find({ category: "Outingwear" });

    const dress = { denims, suits, sweater, intimates, activewear, outingwear };

    res.render("products", { dress });
  } catch (error) {
    res.send({ message: error.message || "Error Occured" });
  }
};


exports.productDetails = async(req, res) => {
  try {
    let productId = req.params.id;
    const product = await Product.findById(productId);
    res.render('product-details', { product } );
  } catch (error) {
    res.send({message: error.message || "Error Occured" });
  }
} 
