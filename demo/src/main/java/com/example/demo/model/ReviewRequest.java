package com.example.demo.model;

public class ReviewRequest {
    private Long userId;
    private String reviewText;
    private Long movieId;

    public ReviewRequest() {
    }

    public ReviewRequest(Long userId, String reviewText, Long movieId) {
        this.userId = userId;
        this.reviewText = reviewText;
        this.movieId = movieId;
    }

    // public ReviewRequest(String reviewText, Long movieId) {
    //     this.reviewText = reviewText;
    //     this.movieId = movieId;
    // }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }   

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }
}
