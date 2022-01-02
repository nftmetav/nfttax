import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navigation } from "../components";

export default function OpenLayout() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-black">
      <Navigation />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
