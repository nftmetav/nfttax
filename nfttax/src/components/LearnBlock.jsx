import React from "react";

export default function LearnBlock() {
  return (
    <section className="relative">
      <div className="container max-w-6xl mx-auto px-10 bg-primary">
        {/* Section header */}
        <div className="mx-auto text-white py-12 mb-20">
          <h1 className="text-2xl text-bold mb-8 text-center">
            Learn more about NFT Tax
          </h1>
          <div className="grid grid-cols-5 gap-6 items-center">
            <p className="max-w-sm text-lg text-left col-span-2">
              <a
                href="https://hackernoon.com/nft-taxes-for-dummies-everything-you-need-to-know-to-get-started"
                className="underline"
              >
                NFT Taxes for Dummies: Everything You Need to Know to Get
                Started
              </a>
            </p>
            <p className="text-justify text-base col-span-3">
              "If you sold an NFT, you have to pay taxes; if you bought and sold
              an NFT, you have to pay taxes; and if you just bought an NFT… you
              have to pay taxes."
              <br />
              <br />
              "In the US, you have to evaluate every transaction at the time of
              trading, both 1) from crypto to USD and also 2) from crypto to
              crypto. If you realize a capital gain, you have to pay taxes on
              it."
              <br />
              <br />
              "In summary, it doesn't matter if the transaction is to USD or to
              crypto. All it matters is the price when you bought and sold the
              asset."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
