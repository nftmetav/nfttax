import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">
          {/* 1st block */}
          <div className="sm:col-span-6 md:col-span-3 col-span-2">
            <div className="flex flex-col justify-start">
              <div className="text-1xl">
                <Logo />
              </div>

              {/* Social links */}
              <ul className="flex mb-4 mt-4 space-x-3">
                <li>
                  <Link
                    to="#"
                    className="flex justify-center items-center hover:text-gray-100 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex justify-center items-center hover:text-gray-100 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                    </svg>
                  </Link>
                </li>
              </ul>

              {/* Copyrights note */}
              <div className="text-sm mr-4 text-white">
                Copyright &copy; NFTTax.
              </div>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 col-span-2 text-white">
            <h6 className="font-medium mb-2">Product</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  to="#"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  Overview
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 col-span-2 text-white">
            <h6 className="font-medium mb-2">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  to="#"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  Terms
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 col-span-2 text-white">
            <h6 className="font-medium mb-2">Company</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  to="#"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="hover:text-gray-100 transition duration-150 ease-in-out"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
