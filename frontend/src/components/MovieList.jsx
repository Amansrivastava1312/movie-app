import React from "react";
import DeleteButton from "./DeleteButton";

const MovieList = ({ movies, onDelete }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="p-4 w-80" // Set a fixed width for each card
        >
          <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col items-center h-full">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col items-center justify-between flex-grow">
              <h3 className="text-white text-lg font-semibold text-center">
                {movie.title}
              </h3>
              <p className="text-white text-sm text-center">{movie.year}</p>
              <DeleteButton movieId={movie._id} onDelete={onDelete} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
