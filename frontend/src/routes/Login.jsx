import React from "react";
import { Navbar } from "../components/Navbar";
import LoginComp from "../components/LoginComp";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center mt-52 items-center gap-2">
        <LoginComp />
        <div className="text-sm">
          
          Don't have an account?
          <Link className="font-semibold" to="/register"> Register Here </Link>
        </div>
      </div>
    </>
  );
};
