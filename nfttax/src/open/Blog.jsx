import React from "react";
import { Outlet } from "react-router-dom";

export default function Blog() {
  return (
    <div className="blog">
      <div className="container">
        <h1 className="text-center mx-6">Blog page</h1>
        <Outlet />
      </div>
    </div>
  );
}
