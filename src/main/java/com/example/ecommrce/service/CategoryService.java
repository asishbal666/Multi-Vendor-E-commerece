package com.example.ecommrce.service;
import java.util.List;
import java.util.Optional;

import com.example.ecommrce.entity.Category;

public interface CategoryService {

    List<Category> getAllCategories();

    Category createCategory(Category category);

    Optional<Category> updateCategory(Long id, Category category);

    boolean deleteCategory(Long id);
}
