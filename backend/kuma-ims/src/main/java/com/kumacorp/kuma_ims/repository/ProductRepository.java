package com.kumacorp.kuma_ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kumacorp.kuma_ims.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    
}
