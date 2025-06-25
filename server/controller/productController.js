import Supplier from "../models/Supplier.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const categories = await Category.find();
    const products = await Product.find({ isDeleted: false })
      .populate("categoryId")
      .populate("supplierId");
    return res
      .status(200)
      .json({ success: true, products, suppliers, categories });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "server error in getting products" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, supplierId } =
      req.body;

    //create new category
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      categoryId,
      supplierId,
    });

    await newProduct.save();
    return res
      .status(201)
      .json({ success: true, message: "product created successfully" });
  } catch (error) {
    console.log("error adding product", error);
    return res
      .status(500)
      .json({ success: false, message: "server error adding product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, supplierId } =
      req.body;

    //update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, categoryId, supplierId },
      { new: true }
    );

    //check if product exist
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "product updated successfully" });
  } catch (error) {
    console.error("error updating product", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //check if product exist
    const existingProduct = Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (existingProduct.isDeleted) {
      return res
        .status(400)
        .json({ success: false, message: "Product arleady deleted" });
    }

    await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("error deleting product", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in deleting product" });
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct };
