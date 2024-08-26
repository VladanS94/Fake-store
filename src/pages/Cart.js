import React, { useContext } from "react";
import { CartContext } from "../state/CartContext "; // Import the CartContext

const Cart = ({ showCart, setShowCart }) => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Get cart items and remove function from context

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <div className="cart-items transition-all duration-300 ease-in-out">
      <div className="left-side w-[70%] h-full fixed top-0 left-0 bg-black opacity-50 transition-opacity duration-300 ease-in-out"></div>

      <div className="right-side h-full w-[30%] bg-gray-500 fixed top-0 right-0 ease-in-out z-10">
        <div className="p-4">
          <button onClick={closeCart} className="text-red-600 mt-4">
            <span className="text-6xl">&#8594;</span>
          </button>
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="border-b py-2 flex justify-between items-center"
              >
                <img src={item.image} alt={item.title} className="w-10 h-10" />
                <div>
                  {item.quantity}x {item.title.slice(0, 20)} - {item.price} $
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
