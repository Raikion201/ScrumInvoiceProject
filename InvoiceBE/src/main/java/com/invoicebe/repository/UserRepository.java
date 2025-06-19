package com.invoicebe.repository;

import com.invoicebe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query methods for finding users by username or email
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}