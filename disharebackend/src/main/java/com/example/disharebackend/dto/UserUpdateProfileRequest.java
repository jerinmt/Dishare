package com.example.disharebackend.dto;

import org.springframework.web.multipart.MultipartFile;

/**
 * Request payload for updating a user's profile with multipart/form-data.
 */
public class UserUpdateProfileRequest {
    private String username;
    private String bio;
    private MultipartFile profileImage;

    public UserUpdateProfileRequest() {
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

    public MultipartFile getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(MultipartFile profileImage) {
        this.profileImage = profileImage;
    }
}
