package com.kumacorp.kuma_ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kumacorp.kuma_ims.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    @Query("SELECT i.product.price FROM Inventory i WHERE i.id = :inventoryId")
    float getPricePerProduct(@Param("inventoryId") int inventoryId);
}
