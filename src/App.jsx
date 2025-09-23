import "./App.css";
import Registration from "./views/Registration/Registration";
import Login from "./views/Login/Login";
import Product from "./views/Product/Product";
import Products from "./views/Products/Products";
import Checkout from "./views/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
