import React from "react";
import PropTypes from "prop-types";

import { upperFirst } from "../utils";


const MovieListClassifier = props => {
  const { is3D, rating_low, ordering, genre } = props.values;
  const genres = [
    "all",
    "action",
    "adventure",
    "animation",
    "biography",
    "comedy",
    "crime",
    "documentary",
    "drama",
    "family",
    "fantasy",
    "film-noir",
    "game-show",
    "history",
    "horror",
    "music",
    "musical",
    "mystery",
    "news",
    "reality-tv",
    "romance",
    "sci-fi",
    "sport",
    "talk-show",
    "thriller",
    "war",
    "western"
  ];
  const rating_low_vals = [6, 7, 8, 9];
  const orderings = [
    "latest",
    "seeds",
    "peers",
    "year",
    "rating",
    "likes",
    "downloads"
  ];

  function handleClassifierChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    props.onClassifierChange({ [name]: value });
  }

  function handleSearchChange(event) {
    props.onSearchChange(event.target.value);
  }

  function handleSubmit(event) {
    props.onSubmit();
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        3D:
        <input
          name="is3D"
          type="checkbox" 
          checked={is3D} 
          onChange={handleClassifierChange} />
      </label>

      <label>
        IMDB Rating:
        <select 
          name="rating_low"
          value={rating_low} 
          onChange={handleClassifierChange}>
          <option value="0">All</option>
          {rating_low_vals.map(item => (
            <option key={item} value={item}>
              {item}+
            </option>
          ))}
        </select>
      </label>

      <label>
        Genre:
        <select 
          name="genre"
          value={genre} 
          onChange={handleClassifierChange}>
          {genres.map(item => (
            <option key={item} value={item}>
              {upperFirst(item)}
            </option>
          ))}
        </select>
      </label>

      <label>
        Order By:
        <select
          name="ordering"
          value={ordering} 
          onChange={handleClassifierChange}>
          {orderings.map(item => (
            <option key={item} value={item}>
              {upperFirst(item)}
            </option>
          ))}
        </select>
      </label>

      <label>
        <input 
          type="text"
          name="searchbox"
          placeholder="Movie Search"
          value={props.searchValue}
          onChange={handleSearchChange}/>
      </label>
    </form>
  );
};

MovieListClassifier.propTypes = {
  values: PropTypes.object,
  onClassifierChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MovieListClassifier;