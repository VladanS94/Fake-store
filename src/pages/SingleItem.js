import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../state/CartContext ";

const SingleItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!item) {
    return (
      <div className="text-xl text-gray-500 text-center mt-20">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 max-w-6xl mx-auto h-[90vh]">
      <Link
        to="/"
        className="self-start mb-6 text-blue-500 font-bold hover:underline"
      >
        ← Back to Products
      </Link>
      <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-lg p-6 w-full">
        <img
          src={item.image}
          alt={item.title}
          className="w-full md:w-1/3 rounded-lg mb-6 md:mb-0"
        />
        <div className="flex flex-col md:ml-6">
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          <p className="text-gray-700 text-lg mb-6">{item.description}</p>
          <p className="text-2xl text-green-600 font-semibold mb-6">
            ${item.price}
          </p>
          <button
            onClick={() => addToCart(item)}
            className="bg-blue-500 text-white text-lg font-medium py-2 px-4 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
