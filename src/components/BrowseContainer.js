import React, { Component } from "react";
import axios from "axios";

import Browse from "./Browse";
import { encodeUrlParams } from "../utils";

const yifyUrl = "https://yts.am/api/v2/";
const yify_list_movies = "list_movies.json";


class BrowseContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      classifier: {
        is3D: false,
        genre: "all",
        rating_low: 0,
        ordering: "latest"
      },
      error: null,
      search: "",
    };

    this.updateMovies = this.updateMovies.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClassifierChange = this.handleClassifierChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  updateMovies() {
    function getSortKeyword(ordering) {
      const dict = {
        downloads: "download_count",
        likes: "like_count",
        latest: "date_added",
        alphabetical: "title"
      };
      if (dict.hasOwnProperty(ordering)) return dict[ordering];
      return ordering;
    }
    const classifier = this.state.classifier;
    let params = {};
    if (classifier.is3D) 
      params.quality = "3D";
    if (classifier.genre !== "all") 
      params.genre = classifier.genre;
    if (classifier.rating_low !== 0) 
      params.minimum_rating = classifier.rating_low;
    if (classifier.ordering !== "latest")
      params.sort_by = getSortKeyword(classifier.ordering);
    
    if (this.state.search !== "")
      params.query_term = this.state.search;

    const url = [yifyUrl, yify_list_movies, "?", encodeUrlParams(params)].join("");

    axios(url)
      .then(res => {
        if (res.data.data.movie_count !== 0)
          this.setState({
            movies: res.data.data.movies.map(movie => ({
              title: movie.title_long,
              pageUrl: movie.url,
              posterUrl: movie.small_cover_image,
              imdb_code: movie.imdb_code
            })),
            error: null
          });
        else
          this.setState({
            movies: [],
            error: "No movies found."
          });
      })
      .catch(err => this.setState({ error: err }));
  }

  componentDidMount() {
    this.updateMovies();
  }

  handleClassifierChange(obj) {
    this.setState(
      state => ({
        classifier: Object.assign(state.classifier, obj)
      }),
      this.updateMovies
    );
  }

  handleSearchChange(searchStr) {
    this.setState({ search: searchStr });
  }

  handleSubmit() {
    this.updateMovies();
  }

  render() {
    return (
      <Browse
        classifierValues={this.state.classifier}
        onClassifierChange={this.handleClassifierChange}
        movies={this.state.movies}
        error={this.state.error}
        searchValue={this.state.search}
        onSearchChange={this.handleSearchChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default BrowseContainer;