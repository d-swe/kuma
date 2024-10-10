package com.kumacorp.kuma_ims.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import com.kumacorp.kuma_ims.model.Product;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
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
                product.setPrice(newProduct.getPrice());
                product.setSku(newProduct.getSku());
                product.setQuantity(newProduct.getQuantity());
                product.setCategory(newProduct.getCategory());
                return productRepository.save(product);
            }).orElseThrow(() -> new EntityNotFoundException("Product with id: " + id + " not found"));
    }

    public long getProductCount() {
        return productRepository.count();
    }

    // public List<Product> findProductsByWarehouseId(int warehouseId) {
    //     return productRepository.findProductsByWarehouseId(warehouseId);
    // }

    // @Transactional
    // public void decreaseProductQuantity(Long productId, int amount) {
    //     productRepository.decrementProductQuantity(productId, amount);
    // }
}
