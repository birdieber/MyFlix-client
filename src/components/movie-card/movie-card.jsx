//Change the name in MovieList
import React from "react";
import PropTypes from "prop-types";
import { MainView } from "../main-view/main-view";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";
// // import { FaThumbsUp } from "react-icons/fa";
// import { ProfileView } from "../profile-view/profile-view";
import AddFavorite from "../add-favorite/add-favorite";

export const MovieCard = ({ movieData, user, movie, token }) => {
	// console.log("NEW" + movieData.title);
	console.log("favemovielist?" + user.favoriteMovies);
	// console.log("NE?W" + AddFavorite);
	console.log("NE?W" + token);

	return (
		<Card className="h-100 ">
			<AddFavorite
				user={user}
				movieData={movieData}
				token={token}
			/>
			<Card.Img
				variant="top"
				src={movieData.image}
				style={{ width: "100%" }}
			/>
			<Card.Body>
				<Card.Title>{movieData.title}</Card.Title>
				<Card.Text>{movieData.director}</Card.Text>
			</Card.Body>
			<Link to={`/movies/${encodeURIComponent(movieData.id)}`}>
				<Button
					variant="primary"
					style={{ width: "100%" }}
					className="rounded-0 rounded-bottom"
				>
					Open
				</Button>
			</Link>
		</Card>
	);
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
	movieData: PropTypes.shape({
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		genre: PropTypes.string.isRequired,
		director: PropTypes.string.isRequired,
	}).isRequired,
};
