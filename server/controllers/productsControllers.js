require("../models/database");
const Product = require("../models/Product");

exports.adminDashboard = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("admin", { products });
  } catch (error) {
    res.send({ message: error.message || "Error Occured" });
  }
};

exports.submitProduct = (req, res) => {
  res.render("submit-product");
};

exports.updateProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    const product = await Product.findById(productId);
    res.render("update-product", { product });
  } catch (error) {
    res.send({ message: error.message || "Error Occured" });
  }
};
