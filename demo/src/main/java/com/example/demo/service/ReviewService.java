package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Movie;
import com.example.demo.model.Review;
import com.example.demo.repository.ReviewRepository;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsForMovie(Movie movie) {
        return reviewRepository.findByMovie(movie);
    }

    public boolean addReview(Review review) {
        try {
            reviewRepository.save(review);
            return true; // Return true if the review is added successfully
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception or handle it as needed
            return false; // Return false if an exception occurs while adding the review
        }
    }
    
    // Other methods for CRUD operations on reviews
}