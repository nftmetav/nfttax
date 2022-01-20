import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  About,
  Blog,
  Contact,
  Home,
  OpenLayout,
  Post,
  Posts,
  Pricing,
  Login,
} from "./open";
import { Dashboard, DashLayout, Profile, Settings } from "./protected";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<OpenLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          {/*
          <Route path="blog" element={<Blog />}>
            <Route path="" element={<Posts />} />
            <Route path=":postId" element={<Post />} />
          </Route>
          */}
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}
