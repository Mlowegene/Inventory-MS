import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./utils/root";
import Login from "./pages/login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Categories from "./components/Categories";
import Supplier from "./components/Supplier";
import Products from "./components/Products";
import Logout from "./components/Logout";
import Summary from "./components/Summary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes requiredRole={["admin"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Summary />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="suppliers" element={<Supplier />} />
          <Route path="orders" element={<h2>Orders</h2>} />
          <Route path="users" element={<h2>Users</h2>} />
          <Route path="profile" element={<h2>Profile</h2>} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route
          path="/customer/dashboard"
          element={<h1>Customer dashboard</h1>}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/unauthorized"
          element={
            <h1 className="font-bold text-red-500 mt-20 ">Unauthorized User</h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
