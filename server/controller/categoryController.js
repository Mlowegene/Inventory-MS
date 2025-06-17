import Category from "../models/Category.js";

const addCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;

    //to check if category already exists
    const existingcategory = await Category.findOne({ categoryName });
    if (existingcategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exist" });
    }

    //create new category
    const newCategory = new Category({
      categoryName,
      categoryDescription,
    });

    await newCategory.save();
    return res
      .status(201)
      .json({ success: true, message: "category created successfully" });
  } catch (error) {
    console.log("error adding category", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    concole.error("error fetching categories", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in getting categories" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, categoryDescription } = req.body;

    //check if category exist
    const existingCategory = Category.findById(id);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, message: "category not found" });
    }

    //update the category
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, categoryDescription },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "category updated successfully" });
  } catch (error) {
    console.error("error updating category", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in updating category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    //check if category exist
    const existingCategory = Category.findById(id);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, message: "category not found" });
    }

    await Category.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "category deleted successfully" });
  } catch (error) {
    console.error("error deleting category", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in deleting category" });
  }
};

export { addCategory, getCategories, updateCategory, deleteCategory };
