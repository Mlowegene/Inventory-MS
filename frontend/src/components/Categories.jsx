import { useState, useEffect } from "react";
import axios from "axios";

function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);

  const token = localStorage.getItem("pos-token");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      console.error("error fetching categories", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if token exists
    if (!token) {
      alert("Please log in first!");
      return;
    }

    if (editCategory) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/category/${editCategory}`,
          { categoryName, categoryDescription },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setEditCategory(null);
          setCategoryName("");
          setCategoryDescription("");
          alert("category updated successfully");
          fetchCategories();
        } else {
          alert("Error editing category");
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
          "http://localhost:5000/api/category/add",
          { categoryName, categoryDescription },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setCategoryName("");
          setCategoryDescription("");
          alert("category added successfully");
          fetchCategories(); //refresh category list after adding new category
        } else {
          alert("Error adding category");
        }
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category");
    if(confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("category deleted successfully");
          fetchCategories(); //refresh category list after adding new category
        } else {
          alert("Error deleting category");
        }
      } catch (error) {
        console.error("error deleting category", error);
      }
    }
  }

  const handleEdit = async (category) => {
    setEditCategory(category._id);
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
  };

  const handleCancel = async () => {
    setEditCategory(null);
    setCategoryName("");
    setCategoryDescription("");
  };

  if (loading) return <div>loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8 ">Categories Management</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-center text-xl font-bold mb-4">
              {editCategory ? "Edit category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={categoryName}
                  placeholder="Category Name"
                  className="border w-full p-2 rounded-md"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={categoryDescription}
                  placeholder="Category Nescription"
                  className="border w-full p-2 rounded-md"
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-400"
                >
                  {editCategory ? "Save changes" : "Add Category"}
                </button>
                {editCategory && (
                  <button
                    type="button"
                    className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full border border-collapse border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2 ">S/N</th>
                  <th className="border border-gray-200 p-2">Category Name</th>
                  <th className="border border-gray-200 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">{index + 1}</td>
                    <td className="border border-gray-200 p-2">
                      {category.categoryName}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                        onClick={()=>handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
