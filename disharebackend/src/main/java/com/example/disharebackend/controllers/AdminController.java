package com.example.disharebackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
@Controller
public class AdminController {

    @GetMapping("/admin/login")
    public String adminLogin() {
        return "login";
    }
    @GetMapping("/admin/home")
    public String adminHome() {
        return "home";
    }
    @GetMapping("/admin/report")
    public String adminReport() {
        return "report";
    }
    @GetMapping("/admin/recipes")
    public String adminRecipes() {
        return "recipes";
    }
    @GetMapping("/admin/users")
    public String adminUsers() {
        return "users";
    }
    @GetMapping("/admin/recipe/{id}")
    public String adminViewRecipe() {
        return "viewRecipe";
    }
    @GetMapping("/admin/user/{id}")
    public String adminViewUser() {
        return "viewUser";
    }
}