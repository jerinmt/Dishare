package com.example.disharebackend.controllers;

import com.example.disharebackend.models.Users;
import com.example.disharebackend.repository.UserRepository;
import com.example.disharebackend.security.TokenGenerator;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class UserAPIController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenGenerator tokenGenerator;


    @Autowired
    private PasswordEncoder passwordEncoder;
    

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        String token = tokenGenerator.generateToken(user.getEmail(), user.getPassword());
        if (token != null) {
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    
    @PostMapping("/logout")
    public String logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenGenerator.invalidateToken(token);
            return "Logout successful";
        }
        return "Invalid token";
    }
    
    
}