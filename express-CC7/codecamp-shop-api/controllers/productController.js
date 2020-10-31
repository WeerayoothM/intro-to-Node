const Product = require('../models/product')

//* ทำเป็น async await เพื่อให้รอโหลดเสร็จก่อน
exports.getProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({ products });
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.status(200).json({ product });

  } catch (err) {
    res.status(500).json({ message: err.message });         //! 500 เป็น internal err
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!price) return res.status(400).json({ message: "Price is required" });

    const product = await Product.create({
      name,
      price,
      description
    });
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });         //! 500 เป็น internal err
  }

};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const product = await Product.findById(id)

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;

    await product.save()

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });         //! 500 เป็น internal err
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
    res.status(204).json()
  } catch (err) {
    res.status(500).json({ message: err.message });         //! 500 เป็น internal err
  }
};