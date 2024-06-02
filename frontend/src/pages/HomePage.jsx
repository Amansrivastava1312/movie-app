import React, { useEffect, useState } from "react";
import SearchMovie from "../components/SearchMovie";
import AddFavoriteButton from "../components/AddFavoriteButton";
import axios from "axios";
import MovieList from "../components/MovieList";
import FavouriteMovies from "../components/FavouriteMovie";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const handleFavouriteClick = async (movie) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add favorites");
      return;
    }

    try {
      const response = await axios.post(
        `/users/${userId}/favorites`,
        {
          movie: {
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            poster: movie.Poster,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      alert(
        "Movie added to favorites , scroll down to see your favorites or check the playlist tab in the navbar"
      );
    } catch (error) {
      console.error("Error adding favorite", error);
    }
  };

  console.log(favourites);
  return (
    <>
      <div className="min-h-[300px] w-full overflow-hidden bg-[#1a1a1a] flex flex-col items-center p-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchValue}
          onChange={handleSearchInputChange}
          className="p-2 border rounded mb-4 w-full max-w-lg"
        />
        <SearchMovie
          movies={movies}
          handleFavouriteClick={handleFavouriteClick}
          AddFavoriteButton={AddFavoriteButton}
        />
      </div>
      <div className="min-h-screen w-full overflow-hidden bg-[#1a1a1a] flex flex-col items-center p-4">
        <FavouriteMovies />
      </div>
    </>
  );
};

export default HomePage;
