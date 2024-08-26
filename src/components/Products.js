import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../state/CartContext ";

const Products = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredData = data.filter((item) => {
    const matchesCategory =
      !selectedCategory ||
      item.category === selectedCategory ||
      (selectedCategory === "shirts" &&
        item.title.toLowerCase().includes("shirt")) ||
      (selectedCategory === "purses" &&
        item.title.toLowerCase().includes("purse"));

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-center p-5">
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-black rounded w-[350px]"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div>
        <ul className="flex justify-center items-center flex-wrap">
          <li
            onClick={() => setSelectedCategory("")}
            className="px-4 py-2 m-4 border-2 border-black rounded cursor-pointer hover:bg-blue-900 hover:text-white"
          >
            All
          </li>
          <li
            onClick={() => setSelectedCategory("men's clothing")}
            className="px-4 py-2 m-4 border-2 border-black rounded cursor-pointer hover:bg-blue-900 hover:text-white"
          >
            Men's clothing
          </li>
          <li
            onClick={() => setSelectedCategory("jewelery")}
            className="px-4 py-2 m-4 border-2 border-black rounded cursor-pointer hover:bg-blue-900 hover:text-white"
          >
            Jewelry
          </li>
          <li
            onClick={() => setSelectedCategory("electronics")}
            className="px-4 py-2 m-4 border-2 border-black rounded cursor-pointer hover:bg-blue-900 hover:text-white"
          >
            Electronics
          </li>
          <li
            onClick={() => setSelectedCategory("women's clothing")}
            className="px-4 py-2 m-4 border-2 border-black rounded cursor-pointer hover:bg-blue-900 hover:text-white"
          >
            Women's clothing
          </li>
        </ul>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4">
        {filteredData &&
          filteredData.map((item) => {
            return (
              <div
                key={item.id}
                className="w-full max-w-sm border-gray-200 rounded-lg shadow bg-[#758285]"
              >
                <Link to={`${item.id}`}>
                  <img
                    className="p-8 rounded-t-lg w-[100%] h-80"
                    src={item.image}
                    alt={item.title}
                  />
                </Link>
                <div className="px-5 pb-5">
                  <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.title.slice(0, 25)}
                  </h5>
                  <p className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.description.slice(0, 100)}
                  </p>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {/* SVG stars for rating */}
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.round(item.rating.rate)
                              ? "text-yellow-300"
                              : "text-gray-200 dark:text-gray-600"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                        {item.rating.rate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {item.price} $
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
