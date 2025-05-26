import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./components/root";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/admin/dashboard" element={<h1>admin dashboard</h1>} />
        <Route
          path="/customer/dashboard"
          element={<h1>Customer dashboard</h1>}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
