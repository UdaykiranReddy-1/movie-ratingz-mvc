// MoviesList.js
import React, { useEffect, useState } from 'react';
import { Link  , useLocation} from 'react-router-dom';
import one from "./assets/1.jpg";
import two from "./assets/2.jpg"
import three from "./assets/3.jpg"
import four from "./assets/4.jpg"
import five from "./assets/5.jpg"

import './movieList.css';


function MoviesList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  console.log('userId:', userId);

  const [movies, setMovies] = useState([]);

  const numberToWord = {
    1: one,
    2: two,
    3: three,
    4: four,
    5: five
};

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/movies");
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data);
      console.log('Movies fetched:', data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="movies-list-container">
      <header>
        <h1>MovieRatingZ</h1>
      </header>
      <div className="movies-container">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/movie/${movie.id}`} state={{ user: `${userId}` }}>
            
              <img src={numberToWord[movie.id]} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>Director: {movie.director}</p>
              <p>Genre: {movie.genre}</p>
              <p>Release Year: {movie.releaseYear}</p>
              <p><strong>Average Rating: {movie.avgRating}</strong></p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
