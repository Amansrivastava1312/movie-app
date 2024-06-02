import React from "react";
import AddFavoriteButton from "./AddFavoriteButton";

const SearchMovie = (props) => {
  const movies = props.movies;
  const AddFavoriteButton = props.AddFavoriteButton;
  return (
    <>
      <div className="flex overflow-x-scroll space-x-4 p-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="min-w-[300px] bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{movie.Title}</h2>
              <p className="text-gray-700 mb-2">Year: {movie.Year}</p>
              <p className="text-gray-700">Type: {movie.Type}</p>
              <div onClick={() => props.handleFavouriteClick(movie)}>
                <AddFavoriteButton />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchMovie;
