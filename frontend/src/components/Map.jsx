import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Popup } from "react-leaflet";
import Player from "./Player";
import { useRadioData } from "../hooks/useRadioData";
import { useState } from "react";
import { useEffect } from "react";


const Map = () => {
  const accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;
  const markers = useRadioData();

  const [currentUrl, setCurrentUrl] = useState(null);
  const [stationName, setStationName] = useState(null);
  const [stationFlag, setStationFlag] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(null);
  const [radioInfo, setRadioInfo] = useState(false)


  const handlePlay = (marker) => {
    setCurrentUrl(marker.url);
    setStationName(marker.name);
    setStationFlag(marker.flag);
    setRadioInfo(true)
    console.log("radio info", radioInfo)
    
  };

  // Radio icon on map
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1527/1527105.png",
    iconSize: [20, 20],
  });

  // Custon leaflet tiles thanks to https://github.com/leaflet-extras/leaflet-providers
  const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}";
  const lightTiles =
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";

  const tileLayerUrl = isDarkMode ? darkTiles : lightTiles;

  // waiting for theme change in navbar component
  useEffect(() => {
    const themeCheckbox = document.querySelector(".theme-controller");
    const updateTheme = () => setIsDarkMode(themeCheckbox.checked);
    updateTheme();
    // clearing event listener to avoid infinite loop
    themeCheckbox.addEventListener("change", updateTheme);
    return () => themeCheckbox.removeEventListener("change", updateTheme);
  }, []);
  console.log(isDarkMode);
  return (
    <div className="z-10">
      <div>
        <MapContainer center={[40, -40]} zoom={4} scrollWheelZoom={false}>
          <TileLayer
            maxZoom={20}
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright"></a>'
            accessToken="hn5kmXxWWOt8euSd433co9RRNzW1eCXooBwj5G1hiLpigxrYau2cXg7KeWy0W6Yl"
            url={`${tileLayerUrl}.png?access-token=${accessToken}`}
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geoCode} icon={customIcon}>
              <Popup>
                <div className="flex flex-col gap-2 w-36">
                  <div>
                    <h1 className="text-xl font-bold text-primary">
                      {marker.popUp}
                    </h1>
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          className="w-[86px] h-[50px] object-contain "
                          src={marker.flag}
                        />
                      </div>

                      <h1 className="text-lg text-secondary">{marker.name}</h1>
                    </div>
                  </div>
                  <button
                    className=" btn text-lg"
                    onClick={() => handlePlay(marker)}
                  >
                    Play
                  </button>
              
                  
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <Player
        url={currentUrl}
        stationName={stationName}
        stationFlag={stationFlag}
        radioInfo = {radioInfo}
      />
    </div>
  );
};

export default Map;