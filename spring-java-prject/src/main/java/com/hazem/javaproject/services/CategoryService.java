package com.hazem.javaproject.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hazem.javaproject.models.Category;
import com.hazem.javaproject.repositories.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    
    // shows all
    public List<Category> allCategories() {
        return categoryRepository.findAll();
    }

    // creates one
    public Category createCategory(Category e) {
        return categoryRepository.save(e);
    }

    // retrieves one by id
    public Category findCategory(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if(optionalCategory.isPresent()) {
            return optionalCategory.get();
        } else {
            return null;
        }
    }

    // updates one
    public Category updateCategory(Category e) {
       	return categoryRepository.save(e);
    }
    
    // deletes one
    public void deleteCategory(Long id) {
    	categoryRepository.deleteById(id);
    }
}