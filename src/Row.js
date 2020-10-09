import React, { useState, useEffect } from 'react';
import axios from './axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      // movieTrailer library its find trailer from youtube
      movieTrailer(movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          urlParams.get('v'); // give you value of v  => (v=L0B6xrYaZ7w)
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    //  dependency [] blank -> run once when row loads  and dont run again
    //  fetchUrl changes this code runs and rerender again
    // if you used any global variable inside useEffect add into the dependency [] *

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'} `}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}

            //dummy image
            // src={`https://cdn.lifehack.org/wp-content/uploads/2017/08/04065343/0-5-1471762906514.jpg`}
            // alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {/* https://www.youtube.com/watch?v=L0B6xrYaZ7w */}
    </div>
  );
};

export default Row;
