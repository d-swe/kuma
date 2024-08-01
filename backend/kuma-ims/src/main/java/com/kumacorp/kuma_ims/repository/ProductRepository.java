package com.kumacorp.kuma_ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kumacorp.kuma_ims.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    @Query("SELECT COUNT(DISTINCT p.category) FROM Product p")
    long countCategories();
}
