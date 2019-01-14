import React from "react";
import PropTypes from "prop-types";
import MovieCardContainer from "./MovieCardContainer";


const MoviesTable = props => (
  <div>
    {props.movies.map(movie => {
      return (
        <MovieCardContainer
          title={movie.title}
          posterUrl={movie.posterUrl}
          imdb_code={movie.imdb_code}
          pageUrl={movie.pageUrl}
          key={movie.imdb_code}
        />
      );
    })}
  </div>
);

MoviesTable.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(MovieCardContainer.propTypes)).isRequired
};

export default MoviesTable;