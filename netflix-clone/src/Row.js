import axios from "./axios";
import React, { useState, useEffect } from "react";
import "./Row.css";

function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies?.map((movie) => {
          return (
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              ></img>
            )
          );
        })}
      </div>
    </div>
  );
}

export default Row;
