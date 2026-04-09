package com.example.disharebackend.dto;

/**
 * Request payload for creating/updating a {@code Recipes} entry.
 * <p>
 * Note: the API accepts {@code "user": "<userId>"} (not a nested {@code Users} object),
 * so this DTO maps the JSON directly to a {@link Long}.
 */
public class RecipeCreateRequest {
    private Long user;
    private String name;
    private String image;
    private String cookingTime;
    private String difficulty;
    private String steps;
    private String ingredients;

    public RecipeCreateRequest() {
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(String cookingTime) {
        this.cookingTime = cookingTime;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }
}

