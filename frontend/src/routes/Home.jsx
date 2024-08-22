import React from 'react'
import Map from '../components/Map'
import "../components/Map.css"
import { Navbar } from '../components/Navbar';
import { Player } from '../components/Player';
export const Home = () => {
  return (
    <>
    <Navbar/>
    <div className=''>
      <Map/>
    <Player/>
    </div>
    </>
  )
}
