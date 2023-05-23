import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "./main-view.scss";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Route } from "react-router";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../navigation-bar/navigation-bar";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	// const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch("https://shrouded-ocean-05047.herokuapp.com/movies", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("movies from api:", data);
				const moviesFromApi = data.map((doc) => {
					return {
						id: doc._id,
						title: doc.title,
						image: doc.imageurl,
						description: doc.description,
						genre: doc.genre.name,
						director: doc.director.name,
					};
				});
				setMovies(moviesFromApi);
			});
	}, [token]);

	// here should use row

	return (
		// wrapping all child components in a single row

		<BrowserRouter>
			<NavigationBar
				user={user}
				onLoggedOut={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}
			/>
			<div className="movielist">
				<Row className="justify-content-md-center">
					<Routes>
						<Route
							path="/signup"
							element={
								<>
									{user ? (
										<Navigate to="/" />
									) : (
										<Col
											md={5}
											className="m-5"
										>
											<SignupView />
										</Col>
									)}
								</>
							}
						/>
						<Route
							path="/login"
							element={
								<>
									{user ? (
										<Navigate to="/" />
									) : (
										<Col
											md={5}
											className="m-5"
										>
											<LoginView
												onLoggedIn={(user, token) => {
													setUser(user);
													setToken(token);
												}}
											/>
										</Col>
									)}
								</>
							}
						/>

						<Route
							path="/movies/:movieId"
							element={
								<>
									{!user ? (
										<Navigate
											to="/login"
											replace
										/>
									) : movies.length === 0 ? (
										<col> The list is empty! </col>
									) : (
										//this is the movie details view (movie view) : selectedMovie ? (
										<Col
											md={8}
											className="mt-5 mb-5"
										>
											<MovieView movies={movies} />
										</Col>
									)}
								</>
							}
						/>
						<Route
							path="/"
							element={
								<>
									{!user ? (
										<Navigate
											to="/login"
											replace
										/>
									) : movies.length === 0 ? (
										<Col>The list is empty!</Col>
									) : (
										<>
											{movies.map((movie) => (
												<Col
													key={movie.id}
													md={3}
													className="p-3"
												>
													<MovieCard movieData={movie} />
												</Col>
											))}
										</>
									)}
								</>
							}
						/>
					</Routes>
				</Row>
			</div>
		</BrowserRouter>
	);
};
