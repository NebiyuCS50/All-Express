import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import Logo from "../assets/Logo.jpeg";
import { Link } from "react-router";

const Cart = () => {
  const [cartProducts, setCartProducts] = React.useState([]);
  const ref = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const fetchCartProducts = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");

      const ids = Object.keys(storedCart);
      if (ids.length === 0) return;

      try {
        setLoading(true);
        const responses = await Promise.all(
          ids.map((id) => fetch(`https://fakestoreapi.com/products/${id}`))
        );

        const products = await Promise.all(responses.map((res) => res.json()));

        const productsWithQty = products.map((product) => ({
          ...product,
          quantity: storedCart[product.id],
        }));

        setCartProducts(productsWithQty);
        console.log("Fetched cart products:", productsWithQty);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const handleInputChange = (e, id) => {
    const val = e.target.value;
    if (val === "") return;
    const num = parseInt(val, 10);

    if (!isNaN(num)) {
      setCartProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, quantity: Math.max(1, num) }
            : product
        )
      );
    }
  };
  const incrementButton = (id) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };
  const decrementButton = (id) => {
    setCartProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
          : product
      )
    );
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
          <div className="absolute right-1 top-2 flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full lg:w-8 lg:h-8 lg:top-3 lg:right-12 lg:top-4">
            <p className="text-white font-semibold lg:text-xl">
              {cartProducts.length || 0}
            </p>
          </div>

          <Link
            to="/cart"
            className="text-white font-semibold hover:text-gray-300 lg:text-xl"
          >
            Cart
          </Link>
        </div>
      </nav>
      <div className="bg-accent mt-20 p-4 rounded-lg flex items-center ">
        <Card className="w-full  ">
          <CardHeader className="font-bold text-2xl text-center">
            Your Shopping Cart
          </CardHeader>
          <CardContent>
            {cartProducts.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartProducts.map((product) => (
                <div key={product.id}>
                  <div className=" py-2 flex items-center gap-4 ml-2 mr-2 lg:gap-5 lg:ml-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-25 h-25"
                    />
                    <p className=" font-black">{product.title}</p>
                  </div>
                  <p className="w-100 ml-24 -mt-7 lg:ml-34 lg:-mt-10 text-sm text-gray-600">
                    {product.category}
                  </p>
                  <Button
                    className="ml-24 mt-2 lg:ml-34 bg-gray-200 text-black hover:bg-gray-300"
                    onClick={() => decrementButton(product.id)}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={product.quantity}
                    min="1"
                    className="ml-2 w-20 text-center lg:ml-4"
                    onChange={(e) => handleInputChange(e, product)}
                    onBlur={(e) => handleInputChange(e, product.id)}
                  />
                  <Button
                    className="ml-2 lg:ml-4 mt-2 bg-gray-200 text-black hover:bg-gray-300"
                    onClick={() => incrementButton(product.id)}
                  >
                    +
                  </Button>
                  <p className="mt-3 ml-24 font-bold lg:ml-34 lg:mt-1">
                    $ {(product.price * product.quantity).toFixed(2)}
                  </p>
                  <Button
                    className="ml-24 mt-2 bg-red-500 text-white hover:bg-red-600 lg:ml-34 lg:mt-4"
                    data-id={product.id}
                    onClick={() => {
                      const updatedCart = cartProducts.filter(
                        (item) => item.id !== product.id
                      );
                      setCartProducts(updatedCart);
                    }}
                  >
                    Remove
                  </Button>
                  <hr className="my-4" />
                </div>
              ))
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-xl bg-orange-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Checkout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    This is where Payment is processed
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Once the Payment is processed, your order will be shipped to
                    your address. Thank you for shopping with us!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button className="hover:bg-red-400 w-full text-xl transition-colors bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
              Cancel
            </Button>
          </CardFooter>
        </Card>
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

export default Cart;
