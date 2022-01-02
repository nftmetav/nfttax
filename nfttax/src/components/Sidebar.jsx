import React from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      id="sidebar"
      className={
        "flex flex-col z-40 left-0 top-0 transform h-screen overflow-y-scroll no-scrollbar w-52 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out translate-x-0"
      }
    >
      {/* Sidebar header */}
      <div className="flex justify-center mb-10 pr-3 px-6 sm:px-2">
        {/* Logo */}
        <NavLink end to="/" className="block">
          <Logo />
        </NavLink>
      </div>

      {/* Links */}
      <div className="space-y-8">
        {/* Pages group */}
        <div className="text-gray-100">
          <h3 className="text-xs uppercase font-semibold pl-3">
            <span className="2xl:block">Pages</span>
          </h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/dashboard" && "bg-gray-900"
              }`}
            >
              <NavLink
                end
                to="/dashboard"
                className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                  pathname === "/dashboard" && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path
                      className={`fill-current ${
                        pathname === "/dashboard"
                          ? "text-indigo-500"
                          : "text-gray-300"
                      }`}
                      d="M11.682 6.177L4 12.505V19.333a0.667 0.667 0 0 0 0.667 0.667l4.669 -0.012a0.667 0.667 0 0 0 0.663 -0.667V15.333a0.667 0.667 0 0 1 0.667 -0.667h2.667a0.667 0.667 0 0 1 0.667 0.667v3.985a0.667 0.667 0 0 0 0.667 0.669L19.333 20a0.667 0.667 0 0 0 0.667 -0.667V12.5L12.32 6.177a0.508 0.508 0 0 0 -0.637 0zM23.817 10.478L20.333 7.607V1.835a0.5 0.5 0 0 0 -0.5 -0.5h-2.333a0.5 0.5 0 0 0 -0.5 0.5v3.025L13.27 1.792a2 2 0 0 0 -2.542 0L0.181 10.478a0.5 0.5 0 0 0 -0.067 0.704l1.063 1.292A0.5 0.5 0 0 0 1.881 12.542l9.801 -8.072a0.508 0.508 0 0 1 0.637 0L22.121 12.542a0.5 0.5 0 0 0 0.704 -0.067l1.063 -1.292a0.5 0.5 0 0 0 -0.071 -0.705z"
                    />
                  </svg>
                  <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                    Dashboard
                  </span>
                </div>
              </NavLink>
            </li>

            {/* Profile */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname.includes("/dashboard/profile") && "bg-gray-900"
              }`}
            >
              <NavLink
                end
                to="/dashboard/profile"
                className={`block hover:text-white truncate transition duration-150 ${
                  pathname.includes("/dashboard/profile") &&
                  "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path
                      className={`fill-current ${
                        pathname.includes("/dashboard/profile")
                          ? "text-indigo-500"
                          : "text-gray-300"
                      }`}
                      d="M12 0C5.37 0 0 5.37 0 12c0 1.86.42 3.61 1.17 5.18.29.61.63 1.19 1.02 1.74C4.36 21.99 7.95 24 12 24s7.64-2.01 9.81-5.08c.39-.55.73-1.13 1.02-1.74C23.58 15.61 24 13.86 24 12c0-6.63-5.37-12-12-12zm0 22c-3.32 0-6.28-1.63-8.1-4.14.79-.42 1.67-.77 2.6-1.06l.12.34C7.34 19.12 9.84 20 12 20s4.66-.88 5.38-2.86l.12-.34c.93.29 1.81.64 2.6 1.06C18.28 20.37 15.32 22 12 22zm-1.84-7.92c-.16-.41-.39-.82-.69-1.21-.58-.76-.9-1.74-.9-2.76C8.57 7.84 10.11 6 12 6s3.43 1.84 3.43 4.11c0 1.02-.32 2-.9 2.76-.3.39-.53.8-.69 1.21-.21.5-.32 1.02-.32 1.52v.21c0 .1.03.19.1.26.07.1.19.18.34.19.52.05 1.04.12 1.54.2-.31.86-1.79 1.54-3.5 1.54s-3.19-.68-3.5-1.54c.5-.08 1.02-.15 1.54-.2.15-.01.27-.09.34-.19.07-.07.1-.16.1-.26v-.21c0-.5-.11-1.02-.32-1.52zm10.95 2.02c-.9-.47-1.87-.88-2.92-1.2-.05-.02-.11-.03-.17-.05-.67-.2-1.36-.37-2.08-.5.05-.09.12-.18.18-.26.85-1.11 1.31-2.52 1.31-3.98C17.43 6.74 15 4 12 4s-5.43 2.74-5.43 6.11c0 1.46.47 2.87 1.31 3.98.07.08.13.17.18.26-.72.13-1.41.3-2.08.5-.06.02-.12.03-.17.05-1.05.32-2.02.73-2.92 1.2C2.31 14.85 2 13.46 2 12 2 6.49 6.49 2 12 2s10 4.49 10 10c0 1.46-.31 2.85-.89 4.1z"
                    />
                  </svg>
                  <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                    Profile
                  </span>
                </div>
              </NavLink>
            </li>

            {/* Settings */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname.includes("settings") && "bg-gray-900"
              }`}
            >
              <NavLink
                end
                to="/dashboard/settings"
                className={`block hover:text-white truncate transition duration-150 ${
                  pathname.includes("/settings") && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path
                      className={`fill-current ${
                        pathname.includes("/settings")
                          ? "text-indigo-500"
                          : "text-gray-300"
                      }`}
                      d="M11.491 7.875a4.125 4.125 0 1 0 4.125 4.125A4.13 4.13 0 0 0 11.491 7.875Zm0 6.75a2.625 2.625 0 1 1 2.625 -2.625A2.628 2.628 0 0 1 11.491 14.625Z"
                    />
                    <path
                      className={`fill-current ${
                        pathname.includes("/settings")
                          ? "text-indigo-500"
                          : "text-gray-300"
                      }`}
                      d="M21.783 15.109l-1.489 -1.226a9.051 9.051 0 0 0 0 -3.766l1.489 -1.226a0.935 0.935 0 0 0 0.216 -1.192l-1.529 -2.648a0.934 0.934 0 0 0 -1.141 -0.409l-1.808 0.677a9.002 9.002 0 0 0 -3.26 -1.884L13.945 1.533A0.934 0.934 0 0 0 13.02 0.75H9.963a0.935 0.935 0 0 0 -0.925 0.783L8.721 3.435a9.001 9.001 0 0 0 -3.26 1.884L3.654 4.642a0.935 0.935 0 0 0 -1.141 0.409L0.984 7.699a0.935 0.935 0 0 0 0.216 1.192l1.489 1.226a9.051 9.051 0 0 0 0 3.766l-1.489 1.226A0.935 0.935 0 0 0 0.984 16.301l1.529 2.648a0.935 0.935 0 0 0 1.141 0.409l1.808 -0.677a9.001 9.001 0 0 0 3.26 1.884l0.317 1.902A0.935 0.935 0 0 0 9.963 23.25h3.057a0.934 0.934 0 0 0 0.925 -0.783l0.317 -1.902a9.002 9.002 0 0 0 3.26 -1.884l1.808 0.677a0.935 0.935 0 0 0 1.141 -0.409L21.998 16.301A0.935 0.935 0 0 0 21.783 15.109Zm-2.374 2.677 -2.255 -0.845 -0.341 0.344a7.498 7.498 0 0 1 -3.404 1.967l-0.469 0.124L12.544 21.75h-2.104l-0.396 -2.374 -0.469 -0.124a7.498 7.498 0 0 1 -3.404 -1.967l-0.341 -0.344L3.574 17.786 2.522 15.964l1.858 -1.529 -0.127 -0.467a7.542 7.542 0 0 1 0 -3.934l0.127 -0.467L2.522 8.036l1.052 -1.822 2.255 0.845 0.341 -0.344a7.498 7.498 0 0 1 3.404 -1.967l0.469 -0.124L10.439 2.25H12.544l0.396 2.374 0.469 0.124a7.498 7.498 0 0 1 3.404 1.967l0.341 0.344 2.255 -0.845 1.052 1.822 -1.858 1.529 0.127 0.467a7.542 7.542 0 0 1 0 3.934l-0.127 0.467 1.858 1.529Z"
                    />
                  </svg>
                  <span className="text-sm font-medium ml-3 2xl:opacity-100 duration-200">
                    Setting
                  </span>
                </div>
              </NavLink>
            </li>

            {/* Logout */}
            <li className="border-t mt-5 pt-5 px-3 py-2 rounded-sm mb-0.5 last:mb-0">
              <div className="flex items-center">
                <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path
                    className="fill-current text-gray-300"
                    d="M3,5 C3,3.9000001 3.9000001,3 5,3 C5,3 7.66666667,3 13,3 L13,5 L5,5 L5,19 L13,19 L13,21 C7.66666667,21 5,21 5,21 C3.9000001,21 3,20.1000004 3,19 C3,9.6236114 3,5 3,5 Z M17.1757866,11 L14.6402527,8.46446609 L16.0544662,7.05025253 L21.0042137,12 L16.0544662,16.9497475 L14.6402527,15.5355339 L17.1757866,13 L10.5900002,13 L10.5900002,11 L17.1757866,11 Z"
                  ></path>
                </svg>

                <a
                  href=""
                  className="text-sm font-medium ml-3 2xl:opacity-100 duration-200"
                  onClick={() => {
                    localStorage.clear();
                    <Navigate to="/dashboard" replace={true} />;
                  }}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
