import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useRadioData } from "../hooks/useRadioData";

const Map = ({ handlePlay }) => {
  const accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;
  const markers = useRadioData();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Radio icon on map
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1527/1527105.png",
    iconSize: [20, 20],
  });

  // Custom leaflet tiles
  const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}";
  const lightTiles = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";

  const tileLayerUrl = isDarkMode ? darkTiles : lightTiles;

  useEffect(() => {
    const themeCheckbox = document.querySelector(".theme-controller");
    const updateTheme = () => setIsDarkMode(themeCheckbox.checked);
    updateTheme();
    themeCheckbox.addEventListener("change", updateTheme);
    return () => themeCheckbox.removeEventListener("change", updateTheme);
  }, []);

  return (
    <div className="z-10">
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
                  <h1 className="text-xl font-bold text-primary">{marker.popUp}</h1>
                  <div className="flex items-center gap-2">
                    <div>
                      <img className="w-[86px] h-[50px] object-contain" src={marker.flag} alt="Station Flag" />
                    </div>
                    <h1 className="text-lg text-secondary">{marker.name}</h1>
                  </div>
                </div>
                <button className="btn text-lg" onClick={() => handlePlay(marker.url, marker.name, marker.flag)}>
                  Play
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
