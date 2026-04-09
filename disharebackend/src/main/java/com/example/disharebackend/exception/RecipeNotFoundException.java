package com.example.disharebackend.exception;

public class RecipeNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

	public RecipeNotFoundException(Long id){
        super("Could not find the product with id "+ id);
    }
}