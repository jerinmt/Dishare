package com.example.disharebackend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Service for handling file uploads (images, etc.)
 * Stores files in the static/uploads directory
 */
@Service
public class FileUploadService {

    @Value("${file.upload-dir:src/main/resources/static/uploads}")
    private String uploadDir;

    /**
     * Save an uploaded file and return its relative path
     *
     * @param file the multipart file to save
     * @param category category for organizing files (e.g., "recipe", "user")
     * @return relative path to the saved file (e.g., /uploads/recipe-uuid-filename.jpg)
     * @throws IOException if file save fails
     */
    public String saveFile(MultipartFile file, String category) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // Create directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        String uniqueFilename = category + "-" + UUID.randomUUID() + "." + extension;

        // Save file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.write(filePath, file.getBytes());

        // Return relative path for serving in frontend
        return "/uploads/" + uniqueFilename;
    }

    /**
     * Get file extension from filename
     */
    private String getFileExtension(String filename) {
        if (filename != null && filename.contains(".")) {
            return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        }
        return "jpg"; // default extension
    }
}
