package com.kumacorp.kuma_ims.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;

import com.kumacorp.kuma_ims.model.Product;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Optional<Product> findProductById(int id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(int id, Product newProduct) {
        return productRepository.findById(id)
                .map(product -> {
                product.setName(newProduct.getName());
                product.setDescription(newProduct.getDescription());
                product.setPrice(newProduct.getPrice());
                product.setSku(newProduct.getSku());
                product.setLastUpdate(OffsetDateTime.now());
                return productRepository.save(product);
            }).orElseThrow(() -> new EntityNotFoundException("Product with id: " + id + " not found"));
    }

    public long getProductCount() {
        return productRepository.count();
    }
}
