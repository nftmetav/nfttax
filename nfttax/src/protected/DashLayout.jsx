import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";

export default function DashLayout({ children }) {
  return (
    <div className="flex flex-row min-h-screen overflow-hidden bg-white">
      <Sidebar />

      <div className="relative flex-grow flex flex-col overflow-y-auto overflow-x-hidden">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
