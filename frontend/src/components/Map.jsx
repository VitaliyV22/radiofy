import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Popup } from "react-leaflet";

import geoPoints from "../local-json/geoPoints.json"


const Map = () => {
  const markers = geoPoints
   
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1527/1527105.png",
    iconSize: [20, 20],
  });
  

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
    
    </div>
  );
};

export default Map;
