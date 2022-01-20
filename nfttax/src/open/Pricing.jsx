import React from "react";

export default function Pricing() {
  return (
    <section className="relative">
      <div className="container max-w-6xl mx-auto px-10">
        <div className="col-lg-7">
          <img
            className="img-fluid rounded mb-10 mt-10 mb-lg-0"
            src="http://placehold.it/900x400"
            alt=""
          />
        </div>
        <div className="col-lg-5 text-white">
          <h1 className="font-weight-light">Pricing</h1>
          <p>
            Our app is completely free to use. If you like it you can buy us a
            coffee by donating to the this address: 0x1234567890abcef.
          </p>
        </div>
      </div>
    </section>
  );
}
