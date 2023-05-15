import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(()=> {
    fetch("https://shrouded-ocean-05047.herokuapp.com/movies")
.then((response) =>response.json())
.then((data)=> {
  console.log("books from api:", data);
  const booksFromApi = data.map((doc) => {
    return{
id: doc._id,
title: doc.title,
image: doc.imageurl,
description: doc.description,
genre: doc.genre.name,
director: doc.director.name
    };
  
  });
  setMovies(booksFromApi);
});
  },[]);



  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div> The list is empty! </div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
