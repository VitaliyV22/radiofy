import React, { useEffect, useRef, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from 'react-hot-toast'
import {
  faCirclePlay,
  faPauseCircle,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { PiStarBold, PiStarFill } from "react-icons/pi";
import FavoritesContext from "../contexts/FavoritesContext";

const Player = ({ url, stationName, stationFlag, radioInfo }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef(null);  

  
  const { favorites, addFavorite, removeFavorite, fetchFavorites } =
    useContext(FavoritesContext);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const favorite = favorites.find((fav) => fav.station_name === stationName);
  const isFavorite = !!favorite;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (url) {
      audio.src = url;
      audio.load();
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          // Reset loading state on success
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
          // Reset loading state on error
          setIsLoading(false);
        });
      // Set loading state before attempting to play
      setIsLoading(true);
    } else {
      audio.pause();
      audio.src = "";
      setIsPlaying(false);
      // Reset loading state if no URL
      setIsLoading(false);
    }
  }, [url]);

  const handleAlert = () => {
    toast.error("Login To Add Favorites"),{
      toastId: 'loginFav'
    }
  }
  const handleFavorites = async () => {
    if (radioInfo === false) {
      toast.error("Please Select A Station", {
        id:"noStation",
      })
      return
    } 
    if (isFavorite) {
      await removeFavorite(favorite.id);
    } else {
      await addFavorite({
        station_name: stationName,
        station_url: url,
        station_flag: stationFlag,
      });
      toast.success("Added to Favorites", {
        toastId: "addFav",
      })
    }
    fetchFavorites();
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  };

  const handlePlayPause = () => {
    if (radioInfo === false) {
      toast.error("please select a station", {
        toastId:'playError',
      })
      return
    } 
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          // Reset loading state on success
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
          // Reset loading state on error
        });
      setIsLoading(false);
      // Set loading state before attempting to play
      setIsLoading(true);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const getVolumeIcon = () => (volume > 0.5 ? faVolumeUp : faVolumeMute);

  return (
    <div className="w-full p-4 shadow-lg flex justify-center gap-5">
      <div className="flex rounded-lg px-2">
        <div className="flex gap-2 items-center p-2 rounded-xl">
          <img className="w-14 h-18" src={stationFlag} />
          <h1 className="font-bold text-2xl">{stationName}</h1>
        </div>
        <div className="flex items-center p-2 rounded-xl gap-3">
          {isLoggedIn ? ( <button className="text-xl" onClick={handleFavorites}>
            {isFavorite ? <PiStarFill /> : <PiStarBold />}
          </button>) : (<button className="text-xl" onClick={handleAlert}> 
            <PiStarBold />
          
          </button>)}
         
          <button onClick={handlePlayPause}>
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <>
                <FontAwesomeIcon
                  className="w-10 h-10"
                  icon={isPlaying ? faPauseCircle : faCirclePlay}
                />
              
              </>
            )}
          </button>
          <button onClick={() => setShowVolumeControl((prev) => !prev)}>
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
      <Toaster />
    </div>
  );
};

export default Player;
