package com.invoicebe.service;

import com.invoicebe.model.User;
import com.invoicebe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Import for password hashing
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new user.
     * Checks if username or email already exists before saving.
     * Hashes the password using BCrypt.
     *
     * @param user The User object to register (with plain-text password).
     * @return The registered User object (with hashed password), or null if username/email already exists.
     */
    public User registerUser(User user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            // You might want to throw a custom exception here for better error handling
            System.out.println("Username already exists: " + user.getUsername());
            return null;
        }

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            // You might want to throw a custom exception here
            System.out.println("Email already exists: " + user.getEmail());
            return null;
        }

        // Hash the plain-text password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    /**
     * Authenticates a user by username and password.
     * This is a simple verification; for full Spring Security authentication,
     * you'd typically implement UserDetailsService.
     *
     * @param username The username provided.
     * @param rawPassword The plain-text password provided.
     * @return An Optional containing the User if authenticated successfully, or empty otherwise.
     */
    public Optional<User> authenticateUser(String username, String rawPassword) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Compare the raw password with the hashed password from the database
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}