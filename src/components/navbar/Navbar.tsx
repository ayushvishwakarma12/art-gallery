import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  return (
    <div className="flex justify-between items-center px-5 py-4 bg-slate-200 ">
      <Link to={"/"}>
        <span className="font-bold font-briemhand text-2xl">Art Gallery</span>
      </Link>
      <ul className="flex items-center gap-5 font-semibold">
        <Link to={"/"}>
          <li
            className={`${
              path === "home"
                ? "text-[#FD814A] underline underline-offset-8"
                : ""
            }`}
          >
            Home
          </li>
        </Link>
        <Link to={"/gallery"}>
          <li
            className={`${
              path === "gallery"
                ? "text-[#FD814A] underline underline-offset-8"
                : ""
            }`}
          >
            Gallery
          </li>
        </Link>
        <Link to={"/category"}>
          <li
            className={`${
              path === "category"
                ? "text-[#FD814A] underline underline-offset-8"
                : ""
            }`}
          >
            Category
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
