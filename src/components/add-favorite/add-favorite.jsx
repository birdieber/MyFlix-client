import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

export const AddFavorite = ({ user, movieData, token }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (user.favoriteMovies.includes(movieData.id)) {
			setIsFavorite(false);
			console.log(user.favoriteMovies);
		} else {
			setIsFavorite(true);
		}
	}, [user, movieData.id]);

	const handleToggleFavorite = () => {
		if (isFavorite) {
			// Add to favorites
			fetch(
				`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieData.id}`,
				{ method: "POST", headers: { Authorization: `Bearer ${token}` } }
			)
				.then((response) => {
					if (response.ok) {
						setIsFavorite(false);
					} else {
						throw new Error("Failed to add to favorites");
					}
				})
				.catch((error) => {
					alert(error.message);
				});
		} else {
			// Remove from favorites
			fetch(
				`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieData.id}`,
				{ method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
			)
				.then((response) => {
					if (response.ok) {
						setIsFavorite(true);
					} else {
						throw new Error("Failed to remove from favorites");
					}
				})
				.catch((error) => {
					alert(error.message);
				});
		}
	};

	return (
		<div
			onClick={handleToggleFavorite}
			disabled={!token}
			style={{
				position: "absolute",
				top: "5px",
				left: "5px",
			}}
		>
			{isFavorite ? (
				<Button variant="secondary">
					<MdOutlineFavoriteBorder />
				</Button>
			) : (
				<Button variant="danger">
					<MdFavorite />
				</Button>
			)}
		</div>
	);
};

AddFavorite.propTypes = {
	user: PropTypes.object.isRequired,
	movieData: PropTypes.object.isRequired,
	token: PropTypes.string,
};
