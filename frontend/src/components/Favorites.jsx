import React, { useContext, useEffect } from "react";
import FavoritesContext from "../contexts/FavoritesContext";

export const Favorites = () => {
  const { favorites, fetchFavorites, removeFavorite, loading, error } = useContext(FavoritesContext);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {favorites.length > 0 ? (
        <div>
          <div>
            <h1 className="font-bold text-4xl m-3">Favorites</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="font-bold text-gray-slate-600">
                  <th>Station Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite) => (
                  <tr key={favorite.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={favorite.station_flag} alt="Station Flag" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{favorite.station_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                      
                        <button
                          onClick={() => removeFavorite(favorite.id)}
                          className="btn btn-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-4xl m-3">No Favorites</h1>
        </div>
      )}
    </>
  );
};