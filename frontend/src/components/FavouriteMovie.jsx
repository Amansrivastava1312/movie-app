import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";

const FavouriteMovies = () => {
  const [favourites, setFavourites] = useState([]);

  const fetchFavouriteMovies = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Replace with the actual user ID

    try {
      const response = await axios.get(`/users/${userId}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavourites(response.data.favoriteMovies);
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
  };

  useEffect(() => {
    fetchFavouriteMovies();
  }, []);
  const handleDelete = (movieId) => {
    setFavourites(favourites.filter((movie) => movie._id !== movieId));
  };

  return (
    <div className="h-screen bg-[#1a1a1a] flex flex-col items-center">
      <h2 className="text-cyan-50">Favorite Movies</h2>
      <MovieList movies={favourites} onDelete={handleDelete} />
    </div>
  );
};

export default FavouriteMovies;
