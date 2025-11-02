import React from "react";
import Home from "../components/Home";
import Shop from "../components/Shop";
const Routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
];

export default Routes;
