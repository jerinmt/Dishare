package com.example.disharebackend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "admins", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Admins {
   
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
   
    @Column(nullable = false)
    private String email;
    private String password;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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