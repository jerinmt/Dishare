package com.example.disharebackend.controllers;

import com.example.disharebackend.models.Users;
import com.example.disharebackend.repository.UserRepository;
import com.example.disharebackend.security.TokenGenerator;
import com.example.disharebackend.dto.ChangePasswordRequest;
import com.example.disharebackend.dto.UserLoginRequest;
import com.example.disharebackend.dto.UserRegistrationRequest;
import com.example.disharebackend.dto.UserResponseDto;
import com.example.disharebackend.dto.UserUpdateProfileRequest;
import com.example.disharebackend.services.FileUploadService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api")
public class UserAPIController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenGenerator tokenGenerator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FileUploadService fileUploadService;
    

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest registrationRequest) {
        Users user = new Users();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest loginRequest) {
        Users existingUser = userRepository.findByEmail(loginRequest.getEmail());
        String token = tokenGenerator.generateToken(loginRequest.getEmail(), loginRequest.getPassword());
        if (token != null && existingUser != null) {
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "id", existingUser.getId(),
                    "email", existingUser.getEmail(),
                    "username", existingUser.getUsername()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password. Please try again."));
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

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable Long id,
            @ModelAttribute UserUpdateProfileRequest updateRequest) {
        
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found: " + id
                ));

        // Update username if provided
        if (updateRequest.getUsername() != null && !updateRequest.getUsername().trim().isEmpty()) {
            user.setUsername(updateRequest.getUsername());
        }

        // Update bio if provided
        if (updateRequest.getBio() != null) {
            user.setBio(updateRequest.getBio());
        }

        // Handle profile image if provided
        if (updateRequest.getProfileImage() != null && !updateRequest.getProfileImage().isEmpty()) {
            try {
                String imagePath = fileUploadService.saveFile(updateRequest.getProfileImage(), "user");
                user.setPic(imagePath);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Failed to upload image: " + e.getMessage()));
            }
        }

        Users updatedUser = userRepository.save(user);
        return ResponseEntity.ok(toDto(updatedUser));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found: " + id
                ));
        return ResponseEntity.ok(toDto(user));
    }

    @PutMapping("/user/{id}/password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest passwordRequest) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found: " + id
                ));

        if (passwordRequest.getCurrentPassword() == null || passwordRequest.getCurrentPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Current password is required."));
        }

        if (passwordRequest.getNewPassword() == null || passwordRequest.getNewPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "New password is required."));
        }

        if (!passwordEncoder.matches(passwordRequest.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Current password is incorrect."));
        }

        user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Password changed successfully."));
    }

    private UserResponseDto toDto(Users user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setBio(user.getBio());
        dto.setPic(user.getPic());
        dto.setIsBlocked(user.getIsBlocked());
        dto.setJoinDate(user.getJoinDate());
        return dto;
    }
    
}