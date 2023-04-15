import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 sm:px-8 py-3 shadow">
      <h2 className="text-xl font-bold">sunglassAuth</h2>
      <ul className="flex gap-5 text-indigo-500 font-semibold">
        <li className="border border-indigo-500 hover:bg-indigo-500 active:bg-indigo-600 hover:text-white duration-200 px-3 py-1 rounded">
          <Link to={"/"}>Login</Link>
        </li>
        <li className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white px-3 py-1 rounded duration-200">
          <Link to={"/register"}>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
