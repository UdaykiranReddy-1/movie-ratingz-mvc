CREATE DATABASE movies;
use movies;

CREATE TABLE Movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT NOT NULL,
    genre VARCHAR(255),
    director VARCHAR(255),
    avg_rating DECIMAL(3, 2) DEFAULT 0.0
);

CREATE TABLE Ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    user_id INT, -- Optional: if you want to associate ratings with users
    rating DECIMAL(3, 2) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

CREATE TABLE Reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    user_id INT, -- Optional: if you want to associate reviews with users
    review_text TEXT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

-- Create Users table if required
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);


-- Insert sample data into Movies table
INSERT INTO Movies (title, release_year, genre, director) VALUES
('Inception', 2010, 'Sci-Fi', 'Christopher Nolan'),
('The Shawshank Redemption', 1994, 'Drama', 'Frank Darabont'),
('The Godfather', 1972, 'Crime', 'Francis Ford Coppola'),
('Pulp Fiction', 1994, 'Crime', 'Quentin Tarantino'),
('The Dark Knight', 2008, 'Action', 'Christopher Nolan');

DELIMITER //

CREATE TRIGGER update_avg_rating
AFTER INSERT ON ratings
FOR EACH ROW
BEGIN
    DECLARE total_ratings DECIMAL(10, 2);
    DECLARE avgrating DECIMAL(3, 2);

    SELECT COUNT(*), AVG(rating)
    INTO total_ratings, avgrating
    FROM ratings
    WHERE movie_id = NEW.movie_id;

    UPDATE movies
    SET avg_rating = avgrating
    WHERE id = NEW.movie_id;
END//

DELIMITER ;



-- Insert sample data into Ratings table
INSERT INTO Ratings (movie_id, user_id, rating) VALUES
(1, 1, 4.5),
(1, 2, 5.0),
(2, 3, 4.8),
(2, 1, 4.7),
(3, 2, 4.9),
(4, 3, 4.5),
(5, 1, 5.0);


-- Insert sample data into Reviews table
INSERT INTO Reviews (movie_id, user_id, review_text) VALUES
(1, 1, 'One of the best movies ever made!'),
(1, 2, 'Mind-bending storyline, loved it.'),
(2, 3, 'A masterpiece that everyone should watch.'),
(3, 2, 'Marlon Brando was phenomenal in this.'),
(4, 3, 'Quentin Tarantino at his finest!'),
(5, 1, 'Heath Ledger\'s Joker is iconic.');


-- Insert sample data into Users table
INSERT INTO Users (username, password, email) VALUES
('user1', 'password1', 'user1@example.com'),
('user2', 'password2', 'user2@example.com'),
('user3', 'password3', 'user3@example.com');

