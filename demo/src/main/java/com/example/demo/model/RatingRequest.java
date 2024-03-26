package com.example.demo.model;

public class RatingRequest {
    private Long userId;
    private Float rating;
    private Long movieId;

    public RatingRequest() {
    }

    public RatingRequest(Long userId, Float rating, Long movieId) {
        this.userId = userId;
        this.rating = rating;
        this.movieId = movieId;
    }

    // public RatingRequest(Float rating, Long movieId) {
    //     this.rating = rating;
    //     this.movieId = movieId;
    // }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }   

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }
}

