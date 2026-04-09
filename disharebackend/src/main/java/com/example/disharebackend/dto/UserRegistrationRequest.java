package com.example.disharebackend.dto;

/**
 * Request payload for user registration.
 * Allows deserialization of username, email, and password without @JsonIgnore restrictions.
 */
public class UserRegistrationRequest {
    private String username;
    private String email;
    private String password;

    public UserRegistrationRequest() {
    }

    public UserRegistrationRequest(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}