package com.example.disharebackend.controllers;

import com.example.disharebackend.dto.RecipeResponseDto;
import com.example.disharebackend.exception.RecipeNotFoundException;
import com.example.disharebackend.models.Users;
import com.example.disharebackend.models.Recipes;
import com.example.disharebackend.repository.RecipeRepository;
import com.example.disharebackend.repository.UserRepository;
import com.example.disharebackend.services.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;


@RestController
public class RecipeAPIController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private FileUploadService fileUploadService;


    @PostMapping("api/addrecipe")
    Recipes newRecipe(
            @RequestParam Long userId,
            @RequestParam String name,
            @RequestParam String cookingTime,
            @RequestParam String difficulty,
            @RequestParam String steps,
            @RequestParam String ingredients,
            @RequestParam(required = false) MultipartFile image) {
        
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found: " + userId
                ));

        Recipes recipe = new Recipes();
        recipe.setName(name);
        recipe.setCookingTime(cookingTime);
        recipe.setDifficulty(difficulty);
        recipe.setSteps(steps);
        recipe.setIngredients(ingredients);
        recipe.setUser(user);
        recipe.setViews(0);
        recipe.setLikes(0);

        // Handle recipe image if provided
        if (image != null && !image.isEmpty()) {
            try {
                String imagePath = fileUploadService.saveFile(image, "recipe");
                recipe.setImage(imagePath);
            } catch (Exception e) {
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Failed to upload image: " + e.getMessage()
                );
            }
        }

        return recipeRepository.save(recipe);
    }


    @GetMapping("api/listrecipe")
    List<RecipeResponseDto> getAllRecipes() {
        return toDtoList(recipeRepository.findAll());
    }


    @GetMapping("api/recipe/{id}")
    RecipeResponseDto getRecipeById(@PathVariable Long id) {
        return recipeRepository.findById(id)
                .map(recipe -> {
                    if (recipe.getViews() == null) {
                        recipe.setViews(0);
                    }
                    recipe.setViews(recipe.getViews() + 1);
                    Recipes updated = recipeRepository.save(recipe);
                    return toDto(updated);
                }).orElseThrow(() -> new RecipeNotFoundException(id));
    }

    @PostMapping("api/recipe/{id}/like")
    RecipeResponseDto likeRecipe(@PathVariable Long id) {
        return recipeRepository.findById(id)
                .map(recipe -> {
                    if (recipe.getLikes() == null) {
                        recipe.setLikes(0);
                    }
                    recipe.setLikes(recipe.getLikes() + 1);
                    Recipes updated = recipeRepository.save(recipe);
                    return toDto(updated);
                }).orElseThrow(() -> new RecipeNotFoundException(id));
    }

    @GetMapping("api/recipe/{id}/likes")
    int getRecipeLikes(@PathVariable Long id) {
        return recipeRepository.findById(id)
                .map(recipe -> recipe.getLikes() == null ? 0 : recipe.getLikes())
                .orElseThrow(() -> new RecipeNotFoundException(id));
    }


    @PutMapping("api/updaterecipe/{id}")
    Recipes updateProduct(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String cookingTime,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String steps,
            @RequestParam(required = false) String ingredients,
            @RequestParam(required = false) MultipartFile image) {
        
        return recipeRepository.findById(id)
                .map(recipe -> {
                    if (name != null) {
                        recipe.setName(name);
                    }
                    if (cookingTime != null) {
                        recipe.setCookingTime(cookingTime);
                    }
                    if (difficulty != null) {
                        recipe.setDifficulty(difficulty);
                    }
                    if (steps != null) {
                        recipe.setSteps(steps);
                    }
                    if (ingredients != null) {
                        recipe.setIngredients(ingredients);
                    }

                    // Handle recipe image if provided
                    if (image != null && !image.isEmpty()) {
                        try {
                            String imagePath = fileUploadService.saveFile(image, "recipe");
                            recipe.setImage(imagePath);
                        } catch (Exception e) {
                            throw new ResponseStatusException(
                                    HttpStatus.INTERNAL_SERVER_ERROR,
                                    "Failed to upload image: " + e.getMessage()
                            );
                        }
                    }

                    return recipeRepository.save(recipe);
                }).orElseThrow(() -> new RecipeNotFoundException(id));
    }

    @DeleteMapping("api/deleterecipe/{id}")
    String deleteRecipe(@PathVariable Long id){
        if(!recipeRepository.existsById(id)){
            throw new RecipeNotFoundException(id);
        }
        recipeRepository.deleteById(id);
        return  "Recipe has been deleted.";
    }
    
    @GetMapping("api/searchrecipe")
    List<RecipeResponseDto> searchRecipes(@RequestParam String keyword) {
        return toDtoList(recipeRepository.findAllByKeyword(keyword));
    }

    @GetMapping("api/user/{userId}/recipes")
    List<RecipeResponseDto> getUserRecipes(@PathVariable Long userId) {
        // Verify user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User not found: " + userId
            );
        }
        return toDtoList(recipeRepository.findByUserId(userId));
    }

    private List<RecipeResponseDto> toDtoList(List<Recipes> recipes) {
        return recipes.stream().map(this::toDto).toList();
    }

    private RecipeResponseDto toDto(Recipes recipe) {
        RecipeResponseDto dto = new RecipeResponseDto();
        dto.setId(recipe.getId());
        dto.setName(recipe.getName());
        dto.setImage(recipe.getImage());
        dto.setCookingTime(recipe.getCookingTime());
        dto.setDifficulty(recipe.getDifficulty());
        dto.setViews(recipe.getViews());
        dto.setLikes(recipe.getLikes());
        dto.setCreatedDate(recipe.getCreatedDate());
        dto.setSteps(recipe.getSteps());
        dto.setIngredients(recipe.getIngredients());
        if (recipe.getUser() != null) {
            dto.setUserId(recipe.getUser().getId());
            dto.setUsername(recipe.getUser().getUsername());
        }
        return dto;
    }
}