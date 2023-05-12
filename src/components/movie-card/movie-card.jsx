// Here you import the PropTypes library
import PropTypes from 'prop-types';


export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movieData);
        }}
      >
        {movieData.title}
      </div>
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
  