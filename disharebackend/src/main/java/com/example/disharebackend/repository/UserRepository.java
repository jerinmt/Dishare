package com.example.disharebackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.disharebackend.models.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
    Users findByToken(String token);
    boolean existsByToken(String token);
}