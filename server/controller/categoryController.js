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

export { addCategory };
