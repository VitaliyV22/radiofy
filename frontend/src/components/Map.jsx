import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Popup } from "react-leaflet";
import axios from "axios";
import geoPoints from "../local-json/geoPoints.json"


const Map = () => {
  const markers = geoPoints
   
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1527/1527105.png",
    iconSize: [20, 20],
  });
  
  const radioData = async () => {
    try {
      const res = await axios({
        url: "http://localhost:8080/api/radiodata",
        method: "GET",
      });
      console.log(res)
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };
 
  return (
    <div>
      <div>
        <MapContainer center={[40, -40]} zoom={4}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright"></a>'
            accessToken="hn5kmXxWWOt8euSd433co9RRNzW1eCXooBwj5G1hiLpigxrYau2cXg7KeWy0W6Yl"
            url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          />
          {markers.map((marker) => (
            <Marker  position={marker.geocode} icon={customIcon}>
              <Popup>
            
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <button className="text-4xl" onClick={radioData}>
        API
      </button>
    </div>
  );
};

export default Map;
