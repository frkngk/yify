import React, {Component} from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import axios from "axios";
import { encodeUrlParams } from "../utils";

const omdbUrl = "http://www.omdbapi.com/";
const omdbKey = "d7d8b26d";


class MovieCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: []
    };
  }

  componentDidMount() {
    const { imdb_code } = this.props;

    const url = [
      omdbUrl,
      encodeUrlParams({
        i: imdb_code,
        apikey: omdbKey
      })
    ].join("?");

    axios(url).then(res => {
      this.setState({
        ratings: res.data.Ratings.map(rating => ({
          source: rating.Source,
          value: rating.Value
        }))
      });
    });
  }

  render() {
    const { title, posterUrl, pageUrl } = this.props;
    return (
      <MovieCard
        title={title}
        posterUrl={posterUrl}
        ratings={this.state.ratings}
        pageUrl={pageUrl}
      />
    );
  }
}

MovieCardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
  imdb_code: PropTypes.string.isRequired
};

export default MovieCardContainer;