import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    
    fetch("https://shrouded-ocean-05047.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data)=> {
          console.log("movies from api:", data);
          const moviesFromApi = data.map((doc) => {
            return{
        id: doc._id,
        title: doc.title,
        image: doc.imageurl,
        description: doc.description,
        genre: doc.genre.name,
        director: doc.director.name
            };
          
          });
          setMovies(moviesFromApi);
        });
          },[token]);


if (!user) {
  return (
    <div>
      <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }} />
  <br />
     <p>If you don't have an account, add your details below.</p>
      <SignupView />
    </div>
  );
}

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
      <button
        onClick={() => {
          setUser(null); 
          setToken(null);
           localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};
