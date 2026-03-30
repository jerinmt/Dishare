package com.example.disharebackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/login")
    public String adminLogin() {
        return "login";
    }
    @GetMapping("/home")
    public String adminHome() {
        return "home";
    }
    @GetMapping("/report")
    public String adminReport() {
        return "report";
    }
    @GetMapping("/recipes")
    public String adminRecipes() {
        return "recipes";
    }
    @GetMapping("/users")
    public String adminUsers() {
        return "users";
    }
    @GetMapping("/recipe/{id}")
    public String adminViewRecipe() {
        return "viewRecipe";
    }
    @GetMapping("/user/{id}")
    public String adminViewUser() {
        return "viewUser";
    }
}