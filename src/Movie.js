import React, { Component } from "react";
import config from "./config";
import axios from "axios";
import "./Movie.css";
import { Link } from "react-router-dom";

export default class Movie extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    //this is where to set up the movie url
    const mid = this.props.match.params.movieId;
    //this url is going to be specific to this movie cos its using mid which is coming from above line
    const singleMovieUrl = `https://api.themoviedb.org/3/movie/${mid}?api_key=${config.api_key}`;
    axios.get(singleMovieUrl).then((response) => {
      console.log(response.data);
      this.setState({
        //we will have to whole movie object available in this.state.movie
        movie: response.data,
      });
    });
  }

  render() {
    console.log(this.props.match);
    //first time we dont want to try render any of the data cos we dont have it yet
    if (this.state.movie.title === undefined) {
      return <h1>Loading...</h1>;
    }

    const movie = this.state.movie;
    const imageUrl = `http://image.tmdb.org/t/p/w300${movie.poster_path}`;
    return (
      <div className="container py-4">
        <div className="row">
          <Link to="/">
            <button type="button" class="btn btn-dark">
              <i class="fas fa-arrow-left"></i> Home
            </button>
          </Link>
        </div>
        <div className="row ">
          {/* match is built by the router, params is an object always inside of match, prop on params for every single 
                wildcard that matches this route and the wildcard that we have established is movieId */}
          {/* <h1>{this.props.match.params.movieId}</h1> */}
          <div className="col-10 mx-auto col-md-6 col-lg-3 my-4">
            <img className="" src={imageUrl} alt="Not available" />
          </div>
          <div className="col-10 mx-auto col-md-6 my-3 text-left">
            <p className="movTitle">{movie.title}</p>
            <p>Budget: {movie.budget}</p>
            <p>Tagline: {movie.tagline}</p>
            <p className="text-muted lead">Overview: {movie.overview}</p>
          </div>
        </div>
      </div>
    );
  }
}
