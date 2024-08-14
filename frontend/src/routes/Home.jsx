import React from 'react'
import Map from '../components/Map'
import "../components/Map.css"
import { Navbar } from '../components/Navbar';
export const Home = () => {
  return (
    <>
    <Navbar/>
    <div className=''>
      <Map/>
    </div>
    </>
  )
}
