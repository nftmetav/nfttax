import React, { useState } from "react";
import { LoginOptions } from "../components";

export default function LoginPage() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 max-w-6xl mx-auto px-10 text-white">
        <div className="col-lg-5 mt-20 place-self-center">
          <h1 className="text-2xl">Connect your wallet</h1>
        </div>

        <LoginOptions />
      </div>
    </section>
  );
}
