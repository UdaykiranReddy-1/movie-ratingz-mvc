package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Movie;
import com.example.demo.model.Review;
import com.example.demo.model.ReviewRequest;
import com.example.demo.service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{movieId}")
    public List<Review> getReviewsForMovie(@PathVariable Long movieId) {
        Movie movie = new Movie();
        movie.setId(movieId);
        return reviewService.getReviewsForMovie(movie);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addReviewForMovie(@RequestBody ReviewRequest reviewRequest) {
        // Check if movieId and reviewText are present in the request body
        if (reviewRequest.getMovieId() == null || reviewRequest.getReviewText() == null) {
            return ResponseEntity.badRequest().body("Movie ID and review text must be provided");
        }
        
        // Retrieve movie by ID
        Movie movie = new Movie();
        movie.setId(reviewRequest.getMovieId());
        
        // Create a Review object
        Review review = new Review();
        review.setMovie(movie);
        review.setReviewText(reviewRequest.getReviewText());
        
        // Assuming you have some logic in ReviewService to add a review
        boolean success = reviewService.addReview(review);
        
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Review added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add review");

    }


    
    // Other methods for CRUD operations on reviews
    }
}