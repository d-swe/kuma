package com.kumacorp.kuma_ims.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.CategoryRepository;
import com.kumacorp.kuma_ims.model.Category;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<Category> findAllCategory() {
        return categoryRepository.findAll();
    }

    public Optional<Category> findCategoryById(int id) {
        return categoryRepository.findById(id);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }

    public long getCategoryCount() {
        return categoryRepository.count();
    }
}
