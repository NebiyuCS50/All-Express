import React, { useRef } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

const Cart = () => {
  const [cartProducts, setCartProducts] = React.useState([]);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const fetchCartProducts = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");

      const ids = Object.keys(storedCart);
      if (ids.length === 0) return; // no items in cart

      try {
        // Fetch all product details in parallel
        const responses = await Promise.all(
          ids.map((id) => fetch(`https://fakestoreapi.com/products/${id}`))
        );

        const products = await Promise.all(responses.map((res) => res.json()));

        // Combine each product with its quantity from storedCart
        const productsWithQty = products.map((product) => ({
          ...product,
          quantity: storedCart[product.id],
        }));

        setCartProducts(productsWithQty);
        console.log("Fetched cart products:", productsWithQty);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
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
      <div className="bg-accent mt-20 p-4 rounded-lg flex items-center">
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
                  <div className=" py-2 flex items-center gap-4 ml-2 mr-2 lg:gap-5">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-25 h-25"
                    />
                    <p className=" font-black">{product.title}</p>
                  </div>
                  <p className="w-100 ml-24 -mt-7 lg:ml-32">
                    {product.category}
                  </p>
                  <Button
                    className="ml-24 mt-2"
                    onClick={() => decrementButton(product.id)}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={product.quantity}
                    min="1"
                    className="ml-2 w-20 text-center"
                    onChange={(e) => handleInputChange(e, product)}
                    onBlur={(e) => handleInputChange(e, product.id)}
                  />
                  <Button
                    className="ml-2"
                    onClick={() => incrementButton(product.id)}
                  >
                    +
                  </Button>
                  <p className="mt-3 ml-24 font-bold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                  <Button className="ml-24 mt-2 bg-red-500 text-white hover:bg-red-600">
                    Remove
                  </Button>
                  <hr className="my-4" />
                </div>
              ))
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
