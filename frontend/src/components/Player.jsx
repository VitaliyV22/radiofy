import React, { useEffect, useRef } from "react";

const Player = ({ url, stationName, stationFlag }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      audioRef.current.play().catch(error => console.error('Error playing audio:', error));
    }
  }, [url]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex items-center justify-between">
      <h1></h1>
      <div className="flex">
      <h1>{stationName}</h1>
      <div>
      <img className="w-13 h-10" src={stationFlag} alt="" />
      </div>
  
      </div>
      
      <audio ref={audioRef} controls className="w-full">
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
  
    </div>
  );
};

export default Player;
