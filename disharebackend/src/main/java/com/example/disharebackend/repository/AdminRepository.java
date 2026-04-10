package com.example.disharebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.disharebackend.models.Admins;

public interface AdminRepository extends JpaRepository<Admins, Long> {
    Admins findByEmail(String email);
}
