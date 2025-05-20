import React from "react";
import { FaFacebookF, FaXTwitter, FaInstagram, FaGlobe } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">

        {/* Contact Email */}
        <div className="flex items-center space-x-2 text-lg text-gray-200 whitespace-nowrap">
          <MdEmail className="text-xl" />
          <span>contact@blogzilla.com</span>
        </div>

        {/* Portfolio Website */}
        <div className="flex items-center space-x-2 text-lg text-gray-200 whitespace-nowrap">
          <FaGlobe className="text-xl" />
          <a
            href="https://portfolio.sujeettech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            https://portfolio.sujeettech.com
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 text-white text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-md text-gray-300 whitespace-nowrap">
          &copy; 2025 Blogzilla. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
