import { useState } from "react";
import axios from "axios";

function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if token exists
    const token = localStorage.getItem("pos-token");
    if (!token) {
      alert("Please log in first!");
      return;
    }

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
      } else {
        alert("Error adding category");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8 ">Categories Management</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-center text-xl font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Category Name"
                  className="border w-full p-2 rounded-md"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category Nescription"
                  className="border w-full p-2 rounded-md"
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-400"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Categories;
