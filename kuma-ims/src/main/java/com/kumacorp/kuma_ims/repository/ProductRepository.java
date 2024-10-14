package com.kumacorp.kuma_ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kumacorp.kuma_ims.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    
    // @Query("SELECT p FROM Product p WHERE p.warehouseId = :warehouseId")
    // List<Product> findProductsByWarehouseId(@Param("warehouseId") int warehouseId);

    // @Modifying
    // @Transactional
    // @Query("UPDATE Product p SET p.quantity = p.quantity - :newValue WHERE p.id = :productId")
    // void decrementProductQuantity(Long productId, int newValue);
}
