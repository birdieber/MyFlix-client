import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

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

          // here should use row

          return (
            // wrapping all child components in a single row
            <Row className = "justify-content-md-center">
            {

            // if user is not logged in show login and signup view
            !user ? (
             <Col md={5} className="m-5">
              <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            }} />
            <SignupView />
            </Col>
            ) 
            
            //this is the movie details view (movie view)
            : selectedMovie ? (
              <Col md={8}  className="mt-5 mb-5">
              <MovieView 
              movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} 
              />
              </Col>
            ) : movies.length === 0 ? (
              <div> The list is empty! </div>
            ) 
            
            //this is the movie menu view (movie card)
            : (
            <>
            {movies.map((movie) => (
                <Col 
                className="mb-4"
                key={movie.id} md={3}>
        <MovieCard 
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          />
          </Col>
          ))}
          <Button variant="danger" style={{width:"95%"}} className="m-auto" 
        onClick={() => {
          setUser(null); 
          setToken(null);
           localStorage.clear();
        }}>
        Logout
      </Button>
          </>
          )}
         
        </Row>
          );  
          };
