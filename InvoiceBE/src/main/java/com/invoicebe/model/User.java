package com.invoicebe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// REMOVE ALL LOMBOK IMPORTS and ANNOTATIONS TEMPORARILY
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;
// import lombok.Builder;

// REMOVE THIS IMPORT IF YOU COMMENTED OUT @JsonIgnore
// import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
// REMOVE ALL LOMBOK ANNOTATIONS HERE:
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username cannot be empty")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Column(nullable = false, unique = true)
    private String username;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    // If you uncommented @JsonIgnore, put it back:
    // @JsonIgnore // Re-add this if you temporarily removed it for test
    @Column(nullable = false)
    private String password;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email must be a valid email format")
    @Column(nullable = false, unique = true)
    private String email;

    // --- MANUALLY ADD REQUIRED CONSTRUCTORS ---
    // No-argument constructor is required by JPA/Jackson
    public User() {
    }

    // Constructor for creating new users (without ID initially)
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // All-arguments constructor (can be used by Builder if you enable it later)
    public User(Long id, String username, String password, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // --- MANUALLY ADD GETTERS AND SETTERS ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // --- MANUALLY ADD toString() for easy debugging (optional but helpful) ---
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='[PROTECTED]'" + // Never print raw password!
                ", email='" + email + '\'' +
                '}';
    }
}
