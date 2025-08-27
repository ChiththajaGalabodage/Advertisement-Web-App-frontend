import { Link, useNavigate } from "react-router-dom";
//import UserData from "./userData";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const navigate = useNavigate();
  console.log("Header component loading...");
  return (
    <header className="w-full h-[80px] shadow-2xl flex justify-center relative">
      <GiHamburgerMenu
        className="h-full  text-3xl md:hidden absolute left-2"
        onClick={() => {
          setSideDrawerOpened(true);
        }}
      />
      <img
        onClick={() => {
          navigate("/");
        }}
        src="/logo.png"
        alt="Logo"
        className="mx-10 w-[110px] h-[80px] object-cover cursor-pointer"
      />
      <div className="w-[calc(100%-160px)] h-full  hidden md:flex justify-center items-center">
        <Link to="/" className=" text-[20px] font-bold mx-2">
          Home
        </Link>
        <Link to="/products" className=" text-[20px] font-bold mx-2">
          Products
        </Link>
        <Link to="/about" className=" text-[20px] font-bold mx-2">
          About
        </Link>
        <Link to="/contact" className=" text-[20px] font-bold mx-2">
          Contact
        </Link>
        <Link to="/search" className=" text-[20px] font-bold mx-2">
          Search
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <Link
          to="/login"
          className="px-6 py-2 h-[40px] rounded-2xl bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium hover:shadow-md transition cursor-pointer"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="ml-3 px-6 py-2 h-[40px] rounded-2xl border border-gray-700 text-gray-700 font-medium hover:bg-gray-700 hover:text-white transition cursor-pointer"
        >
          SignUp
        </Link>
      </div>

      <div className="w-[80px] hidden md:flex justify-center items-center">
        <Link to="/cart" className="text-[20px] font-bold mx-2">
          <BsCart3 />
        </Link>
      </div>
      {sideDrawerOpened && (
        <div className="fixed h-screen w-full  bg-[#00000060] flex md:hidden">
          <div className="w-[350px] bg-white h-full">
            <div className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
              <GiHamburgerMenu
                className="h-full text-3xl absolute left-2 cursor-pointer"
                onClick={() => {
                  setSideDrawerOpened(false);
                }}
              />
              <img
                onClick={() => {
                  window.location.href = "/";
                }}
                src="/logo.png"
                alt="Logo"
                className="w-[80px] h-[80px] object-cover cursor-pointer"
              />
            </div>
            <div className="w-full h-[calc(100%-80px)] flex flex-col items-center goap-2">
              <a href="/" className="text-[20px] font-bold mx-2 my-4">
                Home
              </a>
              <a href="/products" className="text-[20px] font-bold mx-2 my-4">
                Products
              </a>
              <a href="/about" className="text-[20px] font-bold mx-2 my-4">
                About
              </a>
              <a href="/contact" className="text-[20px] font-bold mx-2 my-4">
                Contact
              </a>

              <a href="/cart" className="text-[20px] font-bold mx-2 my-4">
                <BsCart3 />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
