package com.kumacorp.kuma_ims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kumacorp.kuma_ims.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    @Query("SELECT COUNT(DISTINCT p.category) FROM Product p")
    long countCategories();

    @Query("SELECT SUM(p.price * p.quantity) FROM Product p")
    float findTotalValue();

    @Query("SELECT SUM(p.quantity) FROM Product p")
    long findTotalQuantity();

    @Query("SELECT p FROM Product p WHERE p.warehouseId = :warehouseId")
    List<Product> findProductsByWarehouseId(@Param("warehouseId") int warehouseId);
}
