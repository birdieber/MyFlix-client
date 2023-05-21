//Change in MovieDetails
import { Container, Button } from 'react-bootstrap';
import  './movie-view.scss'

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <Container>
        <div  className='moviesheet bg-light rounded'>
        <div>
          <img src={movie.image} alt="movie image" className= "w-50 d-block mx-auto p-3"  />
        </div>
        <div className='movietext p-3'>
        <div>
          <span className="bold">Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span className="bold">Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span className="bold" >Genre: </span>
        <span>{movie.genre}</span>
        </div>
        <div>
          <span className="bold">Director: </span>
          <span>{movie.director}</span>
          </div>
        </div>
        <Button variant="danger" onClick={onBackClick} className="mt-3 rounded-0 rounded-bottom" style={{width: "100%"}}>Back</Button>
        </div>
      </Container>
    );
  };