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
  const markers = useRadioData();
  const [currentUrl, setCurrentUrl] = useState(null);
  const [stationName, setStationName] =useState(null)
  const [stationFlag,setStationFlag] = useState(null)

  const handlePlay = (marker) => {
    setCurrentUrl(marker.url);
    setStationName(marker.name)
    setStationFlag(marker.flag)
  };
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1527/1527105.png",
    iconSize: [20, 20],
  });

  useEffect(() => {
    console.log("Current URL:", currentUrl);
  }, [currentUrl]);

  return (
    <div>
      <div>
        <MapContainer center={[40, -40]} zoom={4}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright"></a>'
            accessToken="hn5kmXxWWOt8euSd433co9RRNzW1eCXooBwj5G1hiLpigxrYau2cXg7KeWy0W6Yl"
            url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geoCode} icon={customIcon}>
              <Popup>
                <div>
                  <h3>{marker.popUp}</h3>
                  <button onClick={() => handlePlay(marker)}>Play</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <Player url={currentUrl}
      stationName={stationName}
      stationFlag={stationFlag} />
    </div>
  );
};

export default Map;
