//Change in MovieDetails
import React from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
	const { movieId } = useParams();

	const movie = movies.find((b) => b.id === movieId);

	return (
		<Container>
			<div
				className="moviesheet rounded"
				style={{ background: "#242846", color: "#eaebf2" }}
			>
				<div>
					<img
						src={movie.image}
						alt="movie image"
						className="w-50 d-block mx-auto p-3"
					/>
				</div>
				<div className="movietext p-3">
					<div>
						<span className="bold">Title: </span>
						<span>{movie.title}</span>
					</div>
					<div>
						<span className="bold">Description: </span>
						<span>{movie.description}</span>
					</div>
					<div>
						<span className="bold">Genre: </span>
						<span>{movie.genre}</span>
					</div>
					<div>
						<span className="bold">Director: </span>
						<span>{movie.director}</span>
					</div>
				</div>
				<Link to={`/`}>
					<Button
						variant="danger"
						className="mt-3 rounded-0 rounded-bottom"
						style={{ width: "100%" }}
					>
						Back
					</Button>
				</Link>
			</div>
		</Container>
	);
};
