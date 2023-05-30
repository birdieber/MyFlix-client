import React, { useEffect, useState } from "react";
import { Col, Card, Container, Button, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileUpdateView } from "../profile-update-view/profile-update-view";

export const ProfileView = ({ user, movies, token, onLoggedOut }) => {
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
		console.log("deleting");
		fetch(`https://shrouded-ocean-05047.herokuapp.com/users/${user.username}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.ok) {
					alert("Your account has been deleted. Good Bye!");
					onLoggedOut();
				} else {
					alert("Could not delete account");
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	const eachFavoriteMovie = movies.filter((movie) =>
		favoriteMovies.includes(movie.id)
	);

	const handleProfileUpdate = () => {
		// Fetch user details again after profile update
		fetchUserDetails();
	};

	return (
		<div>
			<Row className="mt-3 ">
				<Col md={8}>
					<Card style={{ height: "100%" }}>
						<Card.Body>
							<Card.Title>User Profile</Card.Title>
							<p>User: {user.username}</p>
							<p>Email: {user.email}</p>
							<p>
								Birthday:{" "}
								{user.birthday.slice(0, 10).split("-").reverse().join("-")}
							</p>
							<Button
								variant="danger"
								onClick={handleDeleteAccount}
							>
								Delete user account
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<ProfileUpdateView
						user={user}
						token={token}
						onProfileUpdate={handleProfileUpdate}
					/>
				</Col>
			</Row>
			<Row>
				<Col
					md={12}
					style={{ width: "100%" }}
					className="mt-5"
				>
					<h2 className="text-white">Favourite Movies</h2>
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
								md={5}
								token={token}
							/>
						</Col>
					))
				)}
			</Row>
		</div>
	);
};
