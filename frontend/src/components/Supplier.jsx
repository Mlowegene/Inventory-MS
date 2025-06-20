import axios from "axios";
import { useState, useEffect } from "react";

function Supplier() {
  const [addModal, setAddModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("pos-token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editSupplier) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/supplier/${editSupplier}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("supplier updated successfully");
          setAddModal(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
          });
          fetchSuppliers();
        } else {
          alert("Error editing supplier");
        }
      } catch (error) {
        console.error(
          "API editing Error:",
          error.response?.data || error.message
        );
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/supplier/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("supplier added successfully");
          setAddModal(false);
          fetchSuppliers();
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
          });
        } else {
          alert("Error adding supplier ");
        }
      } catch (error) {
        console.error(
          "API Error in adding supplier:",
          error.response?.data || error.message
        );
      }
    }
  };

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/supplier", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuppliers(response.data.suppliers);
      setLoading(false);
    } catch (error) {
      console.error("error fetching suppliers", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    });
    setEditSupplier(supplier._id);
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setEditSupplier(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/supplier/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("supplier deleted successfully");
          fetchSuppliers(); //refresh suppliers list after adding new category
        } else {
          alert("Error deleting supplier");
        }
      } catch (error) {
        console.error("error deleting supplier", error);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Supplier Management</h1>
      <div className="flex justify-between items-center">
        <input
          type="text"
          name="search"
          placeholder="Search.."
          className="border p-1 bg-white rounded px-4"
        />
        <button
          className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer"
          onClick={() => setAddModal(true)}
        >
          Add Supplier
        </button>
      </div>

      {loading ? (
        <div>loading...</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S/N</th>
              <th className="border border-gray-300 p-2">Supplier name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={supplier._id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{supplier.name}</td>
                <td className="border border-gray-300 p-2">{supplier.email}</td>
                <td className="border border-gray-300 p-2">{supplier.phone}</td>
                <td className="border border-gray-300 p-2">
                  {supplier.address}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 cursor-pointer"
                    onClick={() => handleEdit(supplier)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(supplier._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {addModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <h1 className="text-xl font-bold">Add Supplier</h1>
            <button
              className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
              onClick={closeModal}
            >
              X
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Supplier Name"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Supplier Email"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Supplier Phone number"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Supplier Address"
                className="border p-1 bg-white rounded px-4"
              />

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-400"
                >
                  {editSupplier ? "Save changes" : "Add Supplier"}
                </button>
                {editSupplier && (
                  <button
                    type="button"
                    className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Supplier;
