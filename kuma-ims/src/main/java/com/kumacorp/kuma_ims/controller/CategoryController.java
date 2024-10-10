package com.kumacorp.kuma_ims.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kumacorp.kuma_ims.service.CategoryService;
import com.kumacorp.kuma_ims.model.Category;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> findAllCategories() {
        return categoryService.findAllCategory();
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(int id) {
        categoryService.deleteCategory(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findCategoryById(int id) {
        Optional<Category> category = categoryService.findCategoryById(id);
        if(category.isPresent())
            return ResponseEntity.ok(category.get());
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/count")
    public long getCategoryCount() {
        return categoryService.getCategoryCount();
    }
}
