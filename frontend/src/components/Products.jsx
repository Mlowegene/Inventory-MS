import { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    supplierId: "",
  });
  const [filteredProduct, setFilteredProduct] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("pos-token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editProduct) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/${editProduct}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("product updated successfully");
          setOpenModal(false);
          setEditProduct(null);
          setProductData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            supplierId: "",
          });
          fetchProduct();
        } else {
          alert("Error editing product");
        }
      } catch (error) {
        console.error(
          "API editing product Error:",
          error.response?.data || error.message
        );
      }
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/products/add",
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("product added successfully");
          setOpenModal(false);
          fetchProduct();
          setProductData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            supplierId: "",
          });
        } else {
          alert("Error adding product ");
        }
      } catch (error) {
        console.error(
          "API Error in adding product :",
          error.response?.data || error.message
        );
      }
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setSuppliers(response.data.suppliers);
        setCategories(response.data.categories);
        setProducts(response.data.products);
        setFilteredProduct(response.data.products);
      } else {
        console.error("error fetching products", response.data.message);
      }
    } catch (error) {
      console.error("error fetching suppliers", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleEdit = (product) => {
    setOpenModal(true);
    setEditProduct(product._id);
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId._id,
      supplierId: product.supplierId._id,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("product deleted successfully");
          fetchProduct(); //refresh product list after adding new category
        } else {
          alert("Error deleting product");
        }
      } catch (error) {
        console.error("error deleting product", error);
      }
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditProduct(null);
    setProductData({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      supplier: "",
    });
  };

  const handleSearch = (e) => {
    setFilteredProduct(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Product Management</h1>
      <div className="flex justify-between items-center">
        <input
          type="text"
          name="search"
          onChange={handleSearch}
          placeholder="Search.."
          className="border p-1 bg-white rounded px-4"
        />
        <button
          className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Add Product
        </button>
      </div>

      <div>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S/N</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Category Name</th>
              <th className="border border-gray-300 p-2">Supplier Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduct && filteredProduct.map((product, index) => (
              <tr key={product._id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">
                  {product.categoryId.categoryName}
                </td>
                <td className="border border-gray-300 p-2">
                  {product.supplierId.name}
                </td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">
                  <span className="rounded-full font-semibold">
                    {product.stock == 0 ? (
                      <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full">
                        {product.stock}
                      </span>
                    ) : product.stock < 5 ? (
                      <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                        {product.stock}
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full">
                        {product.stock}
                      </span>
                    )}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 cursor-pointer"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProduct.length === 0 && <div>No records</div>}
      </div>

      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <h1 className="text-xl font-bold">Add Product</h1>
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
                value={productData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="text"
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="description"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="border p-1 bg-white rounded px-4"
              />
              <input
                type="number"
                name="stock"
                min="0"
                value={productData.stock}
                onChange={handleChange}
                placeholder="Enter stock"
                className="border p-1 bg-white rounded px-4"
              />

              <div className="w-full border">
                <select
                  name="categoryId"
                  value={productData.categoryId}
                  onChange={handleChange}
                  className="w-full p-2"
                >
                  <option value="">select category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full border">
                <select
                  name="supplierId"
                  value={productData.supplierId}
                  onChange={handleChange}
                  className="w-full p-2"
                >
                  <option value="">select supplier</option>
                  {suppliers &&
                    suppliers.map((supplier) => (
                      <option key={supplier._id} value={supplier._id}>
                        {supplier.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-400"
                >
                  {editProduct ? "Save Changes" : "Add Product"}
                </button>
                {editProduct && (
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

export default Products;
