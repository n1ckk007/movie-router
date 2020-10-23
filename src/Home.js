import React, { Component } from "react";
//npm install axios
import axios from "axios";
import config from "./config";
import { Link } from "react-router-dom";
import "./Movie.css";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      movieList: [],
    };
  }

  //as soon as render runs componentdidmount will run
  componentDidMount() {
    const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${config.api_key}`;
    //axios request, call what we get back 'response'
    axios.get(nowPlayingUrl).then((response) => {
      //this is what axios got back and results is the thing that we want in the json (array of 20 things)
      const movieData = response.data.results;
      //console.log(response.data);
      //because we update state, another render will run
      this.setState({
        movieList: movieData,
      });
    });
  }

  //first time component renders render will run
  render() {
    // console.log(this.state.movieList);
    //as we map through this array, each time through we'll call the one we're on 'movie'
    //and we'll grab the index or no hat we're on and we're goign tor eturn onto this var an element
    const imageUrl = "http://image.tmdb.org/t/p/w300";
    const movieGrid = this.state.movieList.map((movie, index) => {
      //our template literal is going to be the imageUrl string followed by the poster_path string which is in json
      return (
        //bootstrap classes: in extra small screen 9 coloums wide, place in center
        //medium screen 6 cols wide, large screen 3 cols wide, margin top bottom

        <div className="col-9 mx-auto col-md-6 col-lg-3 mt-5" key={index}>
          <Link to={`/movie/${movie.id}`}>
            <img
              className="img-fluid fit"
              src={`${imageUrl}${movie.poster_path}`}
              alt="Not available"
            />
          </Link>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <h1 className="mt-4 mx-auto">Check Out These Movies!</h1>
        </div>
        <div className="row">{movieGrid}</div>
        <div className="row mt-5"></div>
      </div>
    );
  }
}

export default Home;
