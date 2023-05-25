//FAVORITE IS DONE!!!

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const AddFavorite = ({ user, movieData, token }) => {
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		const storedIsAdding = localStorage.getItem(
			`${user.username}_${movieData.id}`
		);
		setIsAdding(storedIsAdding === "true");
	}, [user.username, movieData.id]);

	const handleAddToFavorites = (event) => {
		event.preventDefault();

		if (isAdding) {
			// Remove the movie from favorites
			fetch(
				`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieData.id}`,
				{ method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
			)
				.then((response) => {
					if (response.ok) {
						// alert("Successfully removed from favorites");
						setIsAdding(false);
						localStorage.removeItem(`${user.username}_${movieData.id}`);
					} else {
						throw new Error("Failed to remove from favorites");
					}
				})
				.catch((error) => {
					alert(error.message);
				});
		} else {
			// Add the movie to favorites
			fetch(
				`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieData.id}`,
				{ method: "POST", headers: { Authorization: `Bearer ${token}` } }
			)
				.then((response) => {
					if (response.ok) {
						// alert("Successfully added to favorites");
						setIsAdding(true);
						localStorage.setItem(`${user.username}_${movieData.id}`, "true");
					} else {
						throw new Error("Failed to add to favorites");
					}
				})
				.catch((error) => {
					alert(error.message);
				});
		}
	};

	return (
		<Button
			onClick={handleAddToFavorites}
			disabled={!token}
			className="border-0"
			style={{ width: "12%", position: "absolute" }}
		>
			{isAdding ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
		</Button>
	);
};

AddFavorite.propTypes = {
	user: PropTypes.object.isRequired,
	movieData: PropTypes.object.isRequired,
	token: PropTypes.string,
};

export default AddFavorite;
