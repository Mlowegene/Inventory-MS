import Supplier from "../models/Supplier.js";

const addSupplier = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    //to check if category already exists
    const existingSupplier = await Supplier.findOne({ name });
    if (existingSupplier) {
      return res
        .status(400)
        .json({ success: false, message: "Supplier already exist" });
    }

    //create new category
    const newSupplier = new Supplier({
      name,
      email,
      phone,
      address,
    });

    await newSupplier.save();
    return res
      .status(201)
      .json({ success: true, message: "supplier created successfully" });
  } catch (error) {
    console.log("error adding supplier", error);
    return res
      .status(500)
      .json({ success: false, message: "server error on adding supplier" });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json({ success: true, suppliers });
  } catch (error) {
    concole.error("error fetching suppliers", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in getting suppliers" });
  }
}

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    //check if category exist
    const existingCategory = Supplier.findById(id);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, message: "supplier not found" });
    }

    //update the category
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "supplier updated successfully" });
  } catch (error) {
    console.error("error updating supplier", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in updating supplier" });
  }
};

  const deleteSupplier = async (req, res) => {
    try {
    const { id } = req.params;

    //check if category exist
    const existingSupplier = Supplier.findById(id);
    if (!existingSupplier) {
      return res
        .status(404)
        .json({ success: false, message: "supplier not found" });
    }

    await Supplier.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "supplier deleted successfully" });
  } catch (error) {
    console.error("error deleting supplier", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in deleting supplier" });
  }
  }

export { addSupplier, getSuppliers, updateSupplier, deleteSupplier };
