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
          <Link className="font-semibold" to="/register">
            {" "}
            Register Here{" "}
          </Link>
          <div className=" mt-5 lg:flex flex-col">
          <h1 className="font-bold">Test account</h1>
          <p>Email : admin@gmail.com</p>
          <p>Password : 2207</p>
        </div>
        </div>
      
      </div>
    </>
  );
};
