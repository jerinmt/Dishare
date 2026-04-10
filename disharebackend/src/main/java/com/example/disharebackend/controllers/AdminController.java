package com.example.disharebackend.controllers;

import com.example.disharebackend.models.Recipes;
import com.example.disharebackend.models.Users;
import com.example.disharebackend.repository.RecipeRepository;
import com.example.disharebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("/login")
    public String adminLogin(@RequestParam(required = false) String error,
                             Model model) {
        if (error != null) {
            model.addAttribute("loginError", "Invalid email or password.");
        }
        return "login";
    }

    @GetMapping("/home")
    public String adminHome(Model model) {
        List<Users> users = userRepository.findAll();
        List<Recipes> recipes = recipeRepository.findAll();

        long totalUsers = users.size();
        long activeUsers = users.stream()
                .filter(user -> !Boolean.TRUE.equals(user.getIsBlocked()))
                .count();
        long totalRecipes = recipes.size();
        long totalViews = recipes.stream()
                .mapToLong(recipe -> recipe.getViews() != null ? recipe.getViews() : 0)
                .sum();

        model.addAttribute("totalUsers", totalUsers);
        model.addAttribute("activeUsers", activeUsers);
        model.addAttribute("totalRecipes", totalRecipes);
        model.addAttribute("totalViews", totalViews);

        List<Recipes> topRecipes = recipes.stream()
                .sorted(Comparator.comparingInt((Recipes recipe) -> recipe.getViews() != null ? recipe.getViews() : 0)
                        .reversed())
                .limit(10)
                .collect(Collectors.toList());
        model.addAttribute("topRecipes", topRecipes);

        return "home";
    }

    @GetMapping("/users")
    public String adminUsers(Model model) {
        List<Users> users = userRepository.findAll();
        users.sort(Comparator.comparing(user -> user.getUsername().toLowerCase()));
        model.addAttribute("users", users);
        return "users";
    }

    @GetMapping("/recipes")
    public String adminRecipes(Model model) {
        List<Recipes> recipes = recipeRepository.findAll();
        recipes.sort(Comparator.comparing(Recipes::getCreatedDate, Comparator.nullsLast(Comparator.reverseOrder())));
        model.addAttribute("recipes", recipes);
        return "recipes";
    }

    @GetMapping("/report")
    public String adminReport(Model model) {
        List<Recipes> recipes = recipeRepository.findAll();
        long totalRecipes = recipes.size();
        long totalViews = recipes.stream()
                .mapToLong(recipe -> recipe.getViews() != null ? recipe.getViews() : 0)
                .sum();
        long avgViews = totalRecipes > 0 ? Math.round((double) totalViews / totalRecipes) : 0;

        List<Recipes> topRecipes = recipes.stream()
                .sorted(Comparator.comparingInt((Recipes recipe) -> recipe.getViews() != null ? recipe.getViews() : 0)
                        .reversed())
                .limit(10)
                .collect(Collectors.toList());

        model.addAttribute("totalRecipes", totalRecipes);
        model.addAttribute("totalViews", totalViews);
        model.addAttribute("avgViews", avgViews);
        model.addAttribute("topRecipes", topRecipes);

        return "report";
    }

    @GetMapping("/recipe/{id}")
    public String adminViewRecipe(@PathVariable Long id, Model model) {
        Recipes recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Recipe not found: " + id));

        model.addAttribute("recipe", recipe);
        model.addAttribute("authorName", recipe.getUser() != null ? recipe.getUser().getUsername() : "Unknown");
        model.addAttribute("ingredients", parseLines(recipe.getIngredients()));
        model.addAttribute("steps", parseLines(recipe.getSteps()));

        return "viewRecipe";
    }

    @GetMapping("/user/{id}")
    public String adminViewUser(@PathVariable Long id, Model model) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + id));

        List<Recipes> recipes = recipeRepository.findByUserId(id);
        long totalViews = recipes.stream()
                .mapToLong(recipe -> recipe.getViews() != null ? recipe.getViews() : 0)
                .sum();

        model.addAttribute("user", user);
        model.addAttribute("recipes", recipes);
        model.addAttribute("recipeCount", recipes.size());
        model.addAttribute("totalViews", totalViews);

        return "viewUser";
    }

    @PostMapping("/user/{id}/toggle-block")
    public String toggleUserBlock(@PathVariable Long id) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + id));

        user.setIsBlocked(!Boolean.TRUE.equals(user.getIsBlocked()));
        userRepository.save(user);

        return "redirect:/admin/user/" + id;
    }

    private List<String> parseLines(String rawText) {
        if (rawText == null || rawText.isBlank()) {
            return Collections.emptyList();
        }
        String[] parts = rawText.split("\r?\n|,\s*");
        return Arrays.stream(parts)
                .map(String::trim)
                .filter(part -> !part.isEmpty())
                .collect(Collectors.toList());
    }
}
