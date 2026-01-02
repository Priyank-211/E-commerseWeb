import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";

import Contact from "./pages/Contact";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <h1></h1>
      <div className="px-4 sm:[5vh] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
