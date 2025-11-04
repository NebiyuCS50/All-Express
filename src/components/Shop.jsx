import React, { useRef } from "react";
import Logo from "../assets/Logo.jpeg";
import { useState, useEffect } from "react";
import { Link } from "react-router";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);
  const [numberOfItems, setNumberOfItems] = useState({});

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e, id) => {
    const raw = e.target.value;
    const value = raw === "" ? "" : Math.max(0, parseInt(raw, 10) || 0);
    setNumberOfItems((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleIncrease = (id) => {
    setNumberOfItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };
  const handleDecrease = (id) => {
    setNumberOfItems((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = (product) => {
    const qty = Number(numberOfItems[product.id]) || 1;
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[product.id] = (cart[product.id] || 0) + qty;
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Added to cart:", product.id, qty, cart);
    console.log(numberOfItems);
  };

  return (
    <div>
      {loading && (
        <div
          className="flex justify-center items-center py-20 mt-70"
          role="status"
          aria-live="polite"
        >
          <span
            className="loading loading-bars loading-xl"
            aria-hidden="true"
          />
          <span className="sr-only">Loading products…</span>
        </div>
      )}
      <nav className="bg-gray-800 p-5 absolute top-0 left-0 right-0 flex justify-between items-center gap-7 shadow-2xl lg:p-5">
        <div className="flex items-center gap-2 -ml-2.5 lg:ml-10 lg:gap-4 lg:text-xl ">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover lg:w-16 lg:h-16"
          />
          <h1 className="text-white font-bold lg:text-2xl">All Express</h1>
        </div>
        <div className="flex items-center gap-3 lg:gap-7 lg:text-lg lg:mr-10">
          <Link
            to="/"
            className="text-white font-semibold hover:text-gray-300 lg:text-xl"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-white font-semibold hover:text-gray-300 lg:text-xl"
          >
            Shop
          </Link>
          <div className="absolute right-15 top-4 flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full lg:w-8 lg:h-8 lg:top-3 lg:right-12">
            <p className="text-white font-semibold lg:text-xl">
              {Object.keys(numberOfItems).reduce(
                (acc, key) => acc + (numberOfItems[key] || 0),
                0
              )}
            </p>
          </div>

          <a
            href="#"
            className="text-white font-semibold hover:text-gray-300 lg:text-xl"
          >
            Cart
          </a>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4 pt-28 mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:mt-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 w-full shadow-sm hover:shadow-lg transition-shadow duration-300 hover:scale-105 hover:z-10 hover:shadow-orange-200"
          >
            <figure className="w-full">
              <img
                src={product.image}
                className="h-60 w-full object-contain p-4"
                alt={product.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.title}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>
                {product.description.length > 100
                  ? product.description.slice(0, 100) + "..."
                  : product.description}
              </p>
              <div className="rating mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name={`rating-${product.id}`} // unique per product
                    className="mask mask-star-2 bg-orange-400"
                    aria-label={`${star} star`}
                    checked={star === Math.round(product.rating?.rate ?? 0)}
                    readOnly
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  className="btn btn-accent"
                  onClick={() => handleDecrease(product.id)}
                >
                  -
                </button>
                <input
                  type="number"
                  placeholder="0"
                  className="input input-accent"
                  value={numberOfItems[product.id] || ""}
                  onChange={(e) => handleInputChange(e, product.id)}
                />
                <button
                  className="btn btn-accent"
                  onClick={() => handleIncrease(product.id)}
                >
                  +
                </button>
              </div>
              <div className="card-actions justify-end items-center mt-4">
                <div className="badge badge-outline">$ {product.price}</div>
                <div className="card-actions justify-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Shop;
