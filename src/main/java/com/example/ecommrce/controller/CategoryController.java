package com.example.ecommrce.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ecommrce.entity.Category;
import com.example.ecommrce.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public Object createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @GetMapping
    public Object getAllCategories() {
        return categoryService.getAllCategories();
    }
//
//    @GetMapping("/{id}")
//    public Object getCategory(@PathVariable Long id) {
//        return categoryService.get;
//    }

    @PutMapping("/{id}")
    public Object updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public Object deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}
