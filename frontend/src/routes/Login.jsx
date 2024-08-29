import React from "react";
import { Navbar } from "../components/Navbar";
import LoginComp from "../components/LoginComp";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <>
      <Navbar />
      <LoginComp />
      <div>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
};
