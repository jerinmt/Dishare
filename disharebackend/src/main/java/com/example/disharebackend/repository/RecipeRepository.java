package com.example.disharebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.disharebackend.models.Recipes;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipes, Long> {
    @Query("SELECT p FROM Recipes p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Recipes> findAllByKeyword(@Param("keyword") String keyword);

    @Query("SELECT r FROM Recipes r WHERE r.user.id = :userId")
    List<Recipes> findByUserId(@Param("userId") Long userId);
}