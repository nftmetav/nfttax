import React from "react";
import { Outlet } from "react-router-dom";

export default function Blog() {
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
          <h1 className="font-weight-light">Blog</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </section>
  );
}
