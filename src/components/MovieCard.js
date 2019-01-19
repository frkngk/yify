import React from "react";
import PropTypes from "prop-types";
/*
const eski = (
  <div className="movieCard">
    <a href={pageUrl}>
      <img src={posterUrl} alt={"Poster"} />
    </a>
    <a className="title" href={pageUrl}>
      {title}
    </a>
    <ul className="ratings">
      {ratings.map(rating => {
        const { source, value } = rating;
        return (
          <li className={rating} key={source}>
            <span className="ratingSource">{source}: </span>
            <span className="ratingValue">{value}</span>
          </li>
        );
      })}
    </ul>
  </div>
);
*/
const MovieCard = props => {
  const { title, posterUrl, ratings, pageUrl } = props;
  return (
    <div className="movieCard">
      <ul className="ratings">
        <li className="goruntu">
          <a href={pageUrl}>
            <img src={posterUrl} alt={"Poster"} />
          </a>
          <p />
        </li>
        <li className="title">
          <a href={pageUrl}>{title}</a>
        </li>
        {ratings.map(rating => {
          const { source, value } = rating;
          return (
            <li className={rating} key={source}>
              <span className="ratingSource">{source}: </span>
              <span className="ratingValue">{value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.string,
      value: PropTypes.string
    })
  )
};

export default MovieCard;
