import React from "react";
import { Navbar } from "../components/Navbar";
import { ProfileInfo } from "../components/ProfileInfo";

export const AdminPage = () => {
  return (
    <div>
      <Navbar />{" "}
      <div className="lg:flex ml-6 mt-5 gap-5 flex-col justify-center">
        <ProfileInfo />
      </div>
     
    </div>
  );
};
