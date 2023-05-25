import React, { useEffect, useState } from "react";
import { Col, Card, Container, Button, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, token }) => {
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		fetchUserDetails();
	}, []);

	const fetchUserDetails = () => {
		fetch(`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setFavoriteMovies(data.favoriteMovies);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleDeleteAccount = () => {
		if (
			window.confirm(
				"This will permanently delete your account. Are you sure you want to delete?"
			)
		) {
			deleteAccount();
		}
	};

	const deleteAccount = () => {
		// Implement the delete account logic here
		// ...
	};

	const handleRemoveFromFavorites = (movieId) => {
		fetch(
			`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}/movies/${movieId}`,
			{ method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
		)
			.then((response) => {
				if (response.ok) {
					alert("Successfully removed from favorites");
					setFavoriteMovies((prevMovies) =>
						prevMovies.filter((movie) => movie !== movieId)
					);
				} else {
					throw new Error("Failed to remove from favorites");
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const eachFavoriteMovie = movies.filter((movie) =>
		favoriteMovies.includes(movie.id)
	);

	return (
		<div>
			<Link to={`/`}>
				<Button
					variant="secondary"
					className="mt-3 rounded"
					style={{ width: "10%" }}
				>
					Back
				</Button>
			</Link>
			<Card className="mt-2 mb-3">
				<Card.Body>
					<Card.Title>User Profile</Card.Title>
					<p>User: {user.username}</p>
					<p>Email: {user.email}</p>
					<p>Birthday: {user.birthday}</p>
				</Card.Body>
				<Button
					variant="danger"
					onClick={handleDeleteAccount}
				>
					Delete user account
				</Button>
			</Card>
			<Row>
				<Col
					md={12}
					style={{ width: "100%" }}
				>
					<h2>Favourite Movies</h2>
				</Col>
			</Row>
			<Row>
				{eachFavoriteMovie.length === 0 ? (
					<Col>
						<p>Your favorite list is empty! </p>
						<Link to={`/`}>
							<Button
								variant="danger"
								className="mt-3 rounded"
								style={{ width: "30%" }}
							>
								Add movies
							</Button>
						</Link>
					</Col>
				) : (
					eachFavoriteMovie.map((movie) => (
						<Col key={movie.id}>
							<MovieCard
								user={user}
								movieData={movie}
								md={3}
								token={token}
								onRemoveFromFavorites={handleRemoveFromFavorites}
							/>
						</Col>
					))
				)}
			</Row>
		</div>
	);
};

export default ProfileView;
