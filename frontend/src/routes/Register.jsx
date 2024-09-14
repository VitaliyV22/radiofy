import React from "react";
import { Navbar } from "../components/Navbar";
import RegisterComp from "../components/RegisterComp";
import { Link } from "react-router-dom";
export const Register = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center mt-52 items-center gap-2">
        <RegisterComp />
        <div className="text-sm">
          Have an account ?
          <Link className="font-semibold" to="/login">
            {" "}
            Login{" "}
          </Link>
        </div>
      </div>
    </>
  );
};
