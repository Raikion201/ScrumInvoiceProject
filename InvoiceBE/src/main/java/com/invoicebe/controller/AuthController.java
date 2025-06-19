package com.invoicebe.controller;

import com.invoicebe.model.User;
import com.invoicebe.service.UserService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth") // Common prefix for authentication related endpoints
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Endpoint for user registration.
     *
     * @param user The User object from the request body (containing plain-text password).
     * @return ResponseEntity with the registered User (password hidden) and HTTP status 201 CREATED,
     * or 400 BAD REQUEST if validation fails or username/email already exists.
     */
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        if (registeredUser == null) {
            // This case handles username/email already exists (as per UserService logic)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    /**
     * Endpoint for user login (simple verification for now).
     * In a real app, this would return a JWT token or similar.
     *
     * @param loginRequest A simplified object containing username and password for login.
     * (You'd typically create a dedicated DTO for this, but for simplicity, we can use User model temporarily if only username/password are sent).
     * @return ResponseEntity with success/failure message and appropriate status.
     */
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) { // Using User model for simplicity, but DTO is better
        if (loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password must be provided.");
        }

        Optional<User> authenticatedUser = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (authenticatedUser.isPresent()) {
            // In a real application, you'd generate a JWT token here.
            return ResponseEntity.ok("Login successful for user: " + authenticatedUser.get().getUsername());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }
}