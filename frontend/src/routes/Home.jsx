import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import "../components/Map.css";
import { Navbar } from "../components/Navbar";
import { Favorites } from "../components/Favorites";
import Footer from "../components/Footer";
import Player from "../components/Player";

export const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [stationName, setStationName] = useState("");
  const [stationFlag, setStationFlag] = useState("");
  const [radioInfo, setRadioInfo] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handlePlay = (url, name, flag) => {
    setCurrentUrl(url);
    setStationName(name);
    setStationFlag(flag);
    setRadioInfo(true);
  };

  return (
    <>
      <Navbar />
      <div>
        <Map handlePlay={handlePlay} />
      </div>
      <Player
        url={currentUrl}
        stationName={stationName}
        stationFlag={stationFlag}
        radioInfo={radioInfo}
      />
      <div>
        {isLoggedIn ? <Favorites playStation={handlePlay} /> : <div></div>}
      </div>

      <div className="divider mb-0 "></div>
      <Footer />
    </>
  );
};
