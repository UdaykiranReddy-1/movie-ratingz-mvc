import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './movieView.css';
import one from "./assets/1.jpg";
import two from "./assets/2.jpg"
import three from "./assets/3.jpg"
import four from "./assets/4.jpg"
import five from "./assets/5.jpg"

function MovieView() {
  const location = useLocation();
  const { state } = location;
  const { user } = state;

  console.log('User:', user);

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const numberToWord = {
    1: one,
    2: two,
    3: three,
    4: four,
    5: five
  };

  useEffect(() => {
    // Fetch movie details based on ID
    fetchMovieDetails(id);
    fetchReviews(id);
  }, [id]);

  const fetchMovieDetails = async (id) => {
    try {
      // Example: replace this with your actual API call
      const response = await fetch(`http://localhost:8080/movies/${id}`);
      const data = await response.json();
      setMovie(data); // Assuming data contains movie details
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchReviews = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/reviews/${id}`);
      const data = await response.json();
      setReviews(data); // Assuming data contains an array of reviews
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };


  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingSubmit = async () => {
    try {
      // Construct the data object to send
      const data = {
        rating: rating,
        movieId: id
        // userId: user.userId // Extracted from location state
      };

      // Send the data to your backend
      fetch('http://localhost:8080/ratings/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text(); // Assuming the response is JSON
        })
        .then(data => {
          alert('Rating added successfully');
        })
        .catch(error => {
          console.error('Error adding rating:', error);
        });

      setRating(''); // Clear the rating input after submission

    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      // Construct the data object to send
      const data = {
        reviewText: review,
        movieId: id
        // userId: user.userId // Extracted from location state
      };

      // Send the data to your backend
      fetch('http://localhost:8080/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text(); // Assuming the response is JSON
        })

        .then(data => {
          alert('Review added successfully');
        })
        .catch(error => {
          console.error('Error adding review:', error);
        });

      setReview(''); // Clear the review input after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="movie-view-container">
      <h1 className='head'>Movie RatingZ</h1>
      {movie ? (
        <div className='cont'>
          <h2>{movie.title}</h2>
          <img src={numberToWord[movie.id]} alt={movie.title} />
          <p>Director: {movie.director}</p>
          <p>Release Year: {movie.releaseYear}</p>
          <p>Genre: {movie.genre}</p>
          <p>Average Rating : {movie.avgRating}</p>
          <br />
          <br />
          {/* Additional movie details to display */}
          <div>
            <p>Give your Rating (out of 5) : </p>
            <input type="text" value={rating} onChange={handleRatingChange} />
            <br />
            <br />

            <button onClick={handleRatingSubmit}>Submit Rating</button>
            <br />
            <br />
            <p>Give your Review :</p>
            <textarea value={review} onChange={handleReviewChange} className='textarea' />
            <br />
            <br />
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>
          <div>
            <br />
            <h3> Past Reviews:</h3>
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>{review.reviewText}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieView;
