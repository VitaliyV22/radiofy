import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuthentication";

const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col ">
          <form onSubmit={handleSubmit} className="flex flex-col ">
            <input
              className="input-lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              className="input-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button className="btn-lg border border-slate-200" type="submit">
              Login
            </button>
          </form>
          {error && <h1>{error}</h1>}
        </div>
      </div>
    </>
  );
};

export default LoginComp;
