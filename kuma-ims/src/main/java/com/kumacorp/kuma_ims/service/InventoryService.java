package com.kumacorp.kuma_ims.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.InventoryRepository;
import com.kumacorp.kuma_ims.repository.ProductRepository;
import com.kumacorp.kuma_ims.repository.WarehouseRepository;

import jakarta.persistence.EntityNotFoundException;

import com.kumacorp.kuma_ims.dto.InventoryCreateRequest;
import com.kumacorp.kuma_ims.model.Inventory;
import com.kumacorp.kuma_ims.model.Product;
import com.kumacorp.kuma_ims.model.Warehouse;

@Service
public class InventoryService {
   
    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<Inventory> findAllInventories() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> findInventoryById(int id) {
        return inventoryRepository.findById(id);
    }

    public Inventory saveInventory(InventoryCreateRequest request) {
        Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new EntityNotFoundException("Product with id: " + request.getProductId() + " not found")); 
        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId())
            .orElseThrow(() -> new EntityNotFoundException("Warehouse with id: " + request.getWarehouseId() + " not found"));
        
        Inventory inventory = new Inventory();
        inventory.setProduct(product);
        inventory.setWarehouse(warehouse);
        inventory.setStock(request.getStock());
        inventory.setLastUpdate(LocalDate.now());

        return inventoryRepository.save(inventory);
    }

    public void deleteInventoryById(int id) {
        inventoryRepository.deleteById(id);
    }

    public Inventory updateInventory(int id, Inventory newInventory) {
        return inventoryRepository.findById(id)
        .map(inventory -> {
            inventory.setStock(newInventory.getStock());
            return inventoryRepository.save(inventory);
        }).orElseThrow(() -> new EntityNotFoundException("Inventory with id: " + id + " not found"));
    }
}
