import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  address: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

const SupplierModel = mongoose.model("Supplier", supplierSchema);

export default SupplierModel;
