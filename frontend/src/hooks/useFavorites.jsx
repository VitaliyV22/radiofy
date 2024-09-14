import { useState, useEffect } from "react";
import axios from 'axios';
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/favorites/getFavorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites(response.data);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (favorite) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/favorites/addFavorites",
        favorite,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/api/favorites/removeFavorite/${favoriteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== favoriteId)
      );
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
  };
};
export default useFavorites;
