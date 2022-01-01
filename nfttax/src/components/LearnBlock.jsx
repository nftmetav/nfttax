import React from "react";

export default function LearnBlock() {
  return (
    <section className="relative">
      <div className="container mx-auto px-10 bg-primary">
        {/* Section header */}
        <div className="mx-auto text-white py-12 mb-20">
          <h1 className="text-2xl text-bold mb-8 text-center">
            Learn more about NFT Tax
          </h1>
          <div className="grid grid-cols-5 gap-6 items-center">
            <p className="max-w-sm text-lg text-left col-span-2">
              NFT Taxes for Dummies: <br /> Everything You Need to Know to Get
              Started
            </p>
            <p className="text-justify text-base col-span-3">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur excepteur sint occaecat
              cupidatat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur excepteur sint
              occaecat cupidatat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur
              excepteur sint occaecat cupidatat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur excepteur sint occaecat cupidatat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
