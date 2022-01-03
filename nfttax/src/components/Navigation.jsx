import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Navigation() {
  const navigate = useNavigate();

  const gotoLoginPage = () => {
    console.log("Logging user in");
    navigate("/login");
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto text-white py-5 px-5">
        <div className="flex items-center justify-between">
          <Logo />
          <ul className="mx-10 flex flex-grow justify-around flex-wrap items-center px-5 invisible md:visible">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
          <button
            className="text-white py-1 px-3 rounded-full bg-indigo-600 hover:bg-indigo-700 w-auto"
            onClick={gotoLoginPage}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
}
