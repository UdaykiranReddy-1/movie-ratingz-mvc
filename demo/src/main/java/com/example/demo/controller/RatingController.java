package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Movie;
import com.example.demo.model.Rating;
import com.example.demo.model.RatingRequest;
import com.example.demo.service.RatingService;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;
    
    @PostMapping("/add")
    public ResponseEntity<String> addRatingForMovie(@RequestBody RatingRequest ratingRequest) {
        // Check if movieId and ratingValue are present in the request body
        if (ratingRequest.getMovieId() == null || ratingRequest.getRating() == null) {
            return ResponseEntity.badRequest().body("Movie ID and rating value must be provided");
        }
        
        // Create a Rating object from the request
        Movie movie = new Movie();
        movie.setId(ratingRequest.getMovieId());
        
        Rating rating = new Rating();
        rating.setMovie(movie);
        rating.setRating(ratingRequest.getRating());
        
        // Assuming you have some logic in RatingService to add a rating
        boolean success = ratingService.addRating(rating);
        
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Rating added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add rating");
        }
    }
    // Other methods for CRUD operations on ratings
}
