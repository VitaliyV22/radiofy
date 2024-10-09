import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 

  const fetchFavorites = useCallback(async () => {
   
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://radiofy-server.onrender.com/api/favorites/getFavorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites(response.data);
    } catch (err) {
      setError(
        err.response?.data || "An error occurred while fetching favorites."
      );
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (favorite) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://radiofy-server.onrender.com/api/favorites/addFavorites",
        favorite,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
    } catch (err) {
      setError(
        err.response?.data || "An error occurred while adding the favorite."
      );
      console.error("Error adding favorite:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFavorite = useCallback(async (favoriteId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://radiofy-server.onrender.com/api/favorites/removeFavorite/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== favoriteId)
      );
    } catch (err) {
      setError(
        err.response?.data || "An error occurred while removing the favorite."
      );
      console.error("Error removing favorite:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        error,
        fetchFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
