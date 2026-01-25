import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#E9F1FA] py-6 px-6 border-t w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col items-start space-y-3">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Adlisting Logo" className="w-6 h-6" />
            <span className="text-xl font-bold">Adlisting</span>
          </div>

          {/* Nav Links */}
          <nav className="flex space-x-6 text-sm font-semibold">
            <a href="/listing">Listing</a>
            <a href="/about">About us</a>
            <a href="/blog">Blog</a>
            <a href="/pricingPlan">Pricing Plan</a>
          </nav>
        </div>

        {/* Right Section - Store Buttons */}
        <div className="flex space-x-3 mt-6 md:mt-0">
          <a
            href="#"
            className="flex items-center border rounded-lg px-4 py-2 bg-white"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="App Store"
              className="w-5 h-5 mr-2"
            />
            <div className="text-xs">
              <p>Get it now</p>
              <p className="font-semibold">App Store</p>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center border rounded-lg px-4 py-2 bg-white"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
              alt="Google Play"
              className="w-5 h-5 mr-2"
            />
            <div className="text-xs">
              <p>Get it now</p>
              <p className="font-semibold">Google Play</p>
            </div>
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-400" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">
        {/* Copyright */}
        <p>Copyright 2025 Lomeyo Labs. All Rights Reserved.</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0 text-lg">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaXTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
          <a href="#">
            <FaLinkedinIn />
          </a>
          <a href="#">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 items-end">
        {/*} <button className="bg-black text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md">
          <span>Purchase Now</span>
        </button>
        <button className="flex items-center bg-white px-3 py-2 rounded-full shadow-md">
          <span className="mr-2">Chat with us 👋</span>
        </button> 
        <div className="bg-blue-600 text-white p-2 rounded-full">💬</div>*/}
      </div>
    </footer>
  );
}
