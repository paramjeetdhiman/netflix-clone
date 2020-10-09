import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

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
          <img
            className={`row__poster ${isLargeRow && 'row__posterLarge'} `}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            // src={`https://cdn.lifehack.org/wp-content/uploads/2017/08/04065343/0-5-1471762906514.jpg`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
