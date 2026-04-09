package com.example.disharebackend.dto;

/**
 * Request payload for updating a user's profile.
 * <p>
 * Supports username, bio, and profile picture updates.
 * The image is handled as a multipart file in the request.
 */
public class UserUpdateRequest {
    private String username;
    private String bio;

    public UserUpdateRequest() {
    }

    public UserUpdateRequest(String username, String bio) {
        this.username = username;
        this.bio = bio;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
