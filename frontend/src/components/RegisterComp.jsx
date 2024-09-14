import React, { useState } from "react";
import useAuth from "../hooks/useAuthentication";

const RegisterComp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col ">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              className="input-lg"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
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
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterComp;
