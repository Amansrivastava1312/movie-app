import React from "react";
import axios from "axios";

const DeleteButton = ({ movieId, onDelete }) => {
  const handleDeleteClick = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to delete favorites");
      return;
    }

    try {
      await axios.delete(`/users/${userId}/favorites/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      onDelete(movieId);
    } catch (error) {
      console.error("Error deleting favorite", error);
    }
  };

  return (
    <button
      onClick={handleDeleteClick}
      className="mt-2 text-red-600 bg-neutral-300 rounded"
    >
      Remove from Favorites
    </button>
  );
};

export default DeleteButton;
