import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faPauseCircle,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ url, stationName, stationFlag }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef(null);

  
  useEffect(() => {
    const audio = audioRef.current;

    if (url) {
      audio.src = url;
      audio.load();
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      audio.src = "";
      setIsPlaying(false);
    }
  }, [url]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const getVolumeIcon = () => volume > 0.5 ? faVolumeUp : faVolumeMute;

  return (
    // info
    <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg flex justify-center gap-5">
      <div className="flex gap-2 items-center">
        <img className="w-13 h-10" src={stationFlag}  />
        <h1 className="font-bold text-2xl">{stationName}</h1>
      </div>
      {/* player  */}
      <div className="flex items-center gap-3">
        <button onClick={handlePlayPause}>
          <FontAwesomeIcon className="w-10 h-10" icon={isPlaying ? faPauseCircle : faCirclePlay} />
        </button>
        <button onClick={() => setShowVolumeControl(prev => !prev)}>
          <FontAwesomeIcon icon={getVolumeIcon()} />
        </button>
        {showVolumeControl && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="mx-2"
          />
        )}
        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default Player;
