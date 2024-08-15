import React, { useEffect } from 'react'
import axios from "axios"
import { useEffect } from 'react';
const radioData = async () => {
  try {
    const res = await axios({
      url: "http://localhost:8080/api/radiodata",
      method: "GET",
    });
    console.log(res.data);

  } catch (err) {
    console.error("Error fetching news:", err);
  }
};

useEffect(() => {
  radioData
})

export const useRadio = () => {
  return (
    <div>
        
    </div>
  )
}
