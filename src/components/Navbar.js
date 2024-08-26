import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cart from "../assets/cart.png";
import logo from "../assets/file.png";
import Cart from "../pages/Cart";
import { CartContext } from "../state/CartContext ";
import { paths } from "../app/Routes";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const { pathname } = useLocation();

  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const logOut = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  const setCart = () => {
    setShowCart(!showCart);
  };

  if (pathname === paths.login || pathname === paths.register) return null;

  return (
    <div className="navbar bg-slate-500">
      <ul className="flex justify-between px-10">
        <Link to="/" className="cursor-pointer">
          <img src={logo} alt="logo" className=" w-30 h-20" />
        </Link>
        <li className="cursor-pointer relative flex justify-center items-center">
          <div>
            <button
              onClick={() => logOut()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-9"
            >
              Log Out
            </button>

            {totalItems > 0 && (
              <span className="absolute top-1 right-10 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

          <img
            src={cart}
            alt="cart logo"
            onClick={() => setCart()}
            className="w-10 h-10"
          />
        </li>
      </ul>
      {showCart ? <Cart showCart={showCart} setShowCart={setShowCart} /> : null}
    </div>
  );
};

export default Navbar;
