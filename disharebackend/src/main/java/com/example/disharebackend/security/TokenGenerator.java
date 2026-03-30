package com.example.disharebackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import com.example.disharebackend.models.Users;
import com.example.disharebackend.repository.UserRepository;

@Service
public class TokenGenerator {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int TOKEN_LENGTH = 60;
    private static final SecureRandom RANDOM = new SecureRandom();

    // Method to generate a random alphanumeric string
    private String generateRandomString() {
        StringBuilder stringBuilder = new StringBuilder(TOKEN_LENGTH);

        for (int i = 0; i < TOKEN_LENGTH; i++) {
            int randomIndex = RANDOM.nextInt(CHARACTERS.length());
            stringBuilder.append(CHARACTERS.charAt(randomIndex));
        }

        return stringBuilder.toString();
    }

    // Generate and save the token in the User model
    public String generateToken(String email, String password) {
        Users user = userRepository.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            String token;
            do {
            	token = generateRandomString();
            } while (userRepository.existsByToken(token)); // Check if token exists in DB
            
            user.setToken(token);
            userRepository.save(user);
            return token;
        }
        return null;
    }

    // Validate the token
    public boolean validateToken(String token) {
        Users user = userRepository.findByToken(token);
        return user != null;
    }
    
    public void invalidateToken(String token) {
        Users user = userRepository.findByToken(token);
        if (user != null) {
            user.setToken(null);
            userRepository.save(user);
        }
    }
}