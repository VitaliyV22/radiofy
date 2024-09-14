import React from "react";
import useAuth from "../hooks/useAuthentication";
import { useEffect } from "react";

export const ProfileInfo = () => {
  const { user, getProfile } = useAuth();
  useEffect(() => {
    getProfile();
   
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="lg:flex flex-col gap-2">
        <h1 className="font-bold text-2xl">Welcome, {user.username}</h1>
        <p className="font-semibold">Email: <span className="font-light">{user.email}</span></p>
        <p className="font-semibold">Password: <span className="font-light">{user.password}</span></p>
      </div>
    </div>
  );
};
