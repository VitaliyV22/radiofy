import React from "react";
import { Navbar } from "../components/Navbar";
import useAuth from "../hooks/useAuthentication";
import { useEffect } from "react";

export const AdminPage = () => {
  const { user, getProfile } = useAuth();
  useEffect(() => {
    getProfile();
  }, []);

  if (!user) {
    return <div className="text-2xl items-center">Loading...</div>;
  }
  return (
    <div>
      <Navbar />{" "}
      <div>
        <h1>Admin Page</h1>
      </div>
      <div>
        <h1>Welcome, {user.username}</h1>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};
