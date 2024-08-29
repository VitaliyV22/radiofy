import React from "react";
import { Navbar } from "../components/Navbar";

export const AdminPage = () => {
  return (
    <div>
      <Navbar/>
      {" "}
      <div>
        <h1>Admin Page</h1>
        <p>Welcome to the admin page. You must be logged in to view this.</p>
      </div>
    </div>
  );
};
