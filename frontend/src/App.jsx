import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./utils/root";
import Login from "./pages/login";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes requiredRole={["admin"]}>
              <h1>admin dashboard</h1>
            </ProtectedRoutes>
          }
        />
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
