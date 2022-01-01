import React from "react";

export default function HeroHome() {
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-left pb-12 md:pb-16">
            <h1
              className="max-w-xl text-5xl px-2 md:text-6xl font-extrabold leading-tighter tracking-tighter text-white mb-4"
              data-aos="zoom-y-out"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Tax management for NFT transactions made easy
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="w-full md:w-auto text-xl text-gray-100 mt-8 mb-8 px-2"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Use our system to view, tag and export all your taxable NFT
                transactions in one place.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none flex justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <button className="text-white py-1.5 px-3 rounded-lg  bg-indigo-600 hover:bg-indigo-700 w-auto">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
