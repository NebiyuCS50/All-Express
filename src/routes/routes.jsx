import React from "react";
import Home from "../components/Home";
import Shop from "../components/Shop";
import Cart from "../components/Cart";
const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

export default routes;
