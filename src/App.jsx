import "./App.css";
import Registration from "./views/Registration/Registration";
import Login from "./views/Login/Login";
import Product from "./views/Product/Product";
import Products from "./views/Products/Products";
import Checkout from "./views/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute><Product/></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
