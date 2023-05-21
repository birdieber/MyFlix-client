//Change the name in MovieList
import PropTypes from 'prop-types';
import {Button, Card} from "react-bootstrap";
import './movie-card.scss';


export const MovieCard = ({ movieData, onMovieClick }) => { return (
  <Card className="h-100 ">
    <Card.Img variant="top" src={movieData.image} style ={{width : "100%"}}/>
    <Card.Body>
      <Card.Title>{movieData.title}</Card.Title>
      <Card.Text>{movieData.director}</Card.Text>
    </Card.Body>
    <Button onClick={() => onMovieClick(movieData)} variant="primary" style={{width: "100%"}} className='rounded-0 rounded-bottom'>
        Open
      </Button>
  </Card>
);
  };

  // Here is where we define all the props constraints for the MovieCard
  MovieCard.propTypes = {
movieData: PropTypes.shape({
title: PropTypes.string.isRequired,
image: PropTypes.string.isRequired,
genre:  PropTypes.string.isRequired,
director: PropTypes.string.isRequired
}).isRequired,
onMovieClick: PropTypes.func.isRequired
};
  