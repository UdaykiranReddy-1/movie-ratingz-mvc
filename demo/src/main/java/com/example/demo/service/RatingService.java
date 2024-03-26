package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Rating;
import com.example.demo.repository.RatingRepository;

@Service
public class RatingService {
    @Autowired
    private RatingRepository ratingRepository;
    
    public boolean addRating(Rating rating) {
        try {
            ratingRepository.save(rating);
            return true; // Return true if the rating is added successfully
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception or handle it as needed
            return false; // Return false if an exception occurs while adding the rating
        }
    }
    
    // Other methods for CRUD operations on ratings
}