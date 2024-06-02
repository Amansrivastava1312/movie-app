import React from "react";

const AddFavoriteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-2 rounded mt-2"
    >
      Add to Favorites
    </button>
  );
};

export default AddFavoriteButton;
