import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import "../components/Map.css";
import { Navbar } from "../components/Navbar";
import { Favorites } from "../components/Favorites";

export const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Map />
      </div>
      <div>
        {isLoggedIn ? <Favorites /> : <div></div>}
      </div>
      <div>
        <div>
          <h1>
            
          </h1>
        </div>
      </div>
    </>
  );
};
