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
      <div>
        <h1>Welcome, {user.username}</h1>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};
