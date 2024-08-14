import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
const Map = () => {
  return (
    <div>
        <MapContainer center={[40, -40]} zoom={4}>
        <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright"></a>'
        accessToken= "hn5kmXxWWOt8euSd433co9RRNzW1eCXooBwj5G1hiLpigxrYau2cXg7KeWy0W6Yl"
        url= "https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        />
        </MapContainer>
        
    </div>
  )
}

export default Map