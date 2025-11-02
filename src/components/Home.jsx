// ...existing code...
import React from "react";
import Img1 from "../assets/Img.jpg";
import Img2 from "../assets/Img2.jpeg";
import Img3 from "../assets/Img3.jpeg";
import Img4 from "../assets/Img4.jpeg";
import Logo from "../assets/Logo.jpeg";

const Home = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-10 absolute top-0 left-0 right-0 flex justify-between items-center gap-7 shadow-2xl lg:p-5">
        <div className="flex items-center gap-2 -ml-2.5 lg:ml-10 lg:gap-4 lg:text-xl ">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover lg:w-16 lg:h-16"
          />
          <h1 className="text-white font-bold lg:text-2xl">All Express</h1>
        </div>
        <div className="flex items-center gap-3 lg:gap-7 lg:text-lg">
          <a
            href="#"
            className="text-white font-semibold hover:text-gray-300 lg:text-xl"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white font-semibold hover:text-gray-300 lg:text-xl"
          >
            Shop
          </a>
          <a
            href="#"
            className="text-white font-semibold hover:text-gray-300 lg:text-xl"
          >
            Cart
          </a>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center gap-6 h-screen lg:flex-row lg:gap-10">
        <h1 className="text-3xl font-bold text-center">
          Welcome to the Shopping Cart
        </h1>
        <div className="flex gap-3 justify-center ">
          <img
            src={Img1}
            alt="Shopping Cart"
            className="w-40 h-40 lg:w-70 lg:h-70 object-cover"
          />
          <img
            src={Img2}
            alt=""
            className="object-cover w-40 h-40 lg:w-70 lg:h-70"
          />
        </div>
        <div className="flex gap-3 justify-center">
          <img
            src={Img3}
            alt="Shopping Cart"
            className="w-40 h-40 lg:w-70 lg:h-70 object-cover"
          />
          <img
            src={Img4}
            alt=""
            className="object-cover w-40 h-40 lg:w-70 lg:h-70"
          />
        </div>
        <button className="btn btn-lg btn-primary">Go to Shopping</button>
      </div>
    </div>
  );
};

export default Home;
// ...existing code...
