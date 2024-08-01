package com.kumacorp.kuma_ims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kumacorp.kuma_ims.model.Inventory;
import com.kumacorp.kuma_ims.model.Product;

public interface InventoryRepository extends JpaRepository<Inventory, Integer>{
    @Query("SELECT i.product FROM Inventory i WHERE i.warehouse.id = :warehouseId")
    List<Product> findProductsByWarehouse(@Param("warehouseId") int warehouseId);
}
