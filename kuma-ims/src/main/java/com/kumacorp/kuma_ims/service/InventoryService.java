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
        inventory.setLastUpdate(LocalDate.now());
        if(request.getStock() <= (warehouse.getMaxCapacity() - warehouse.getCurrentCapacity())) {
            inventory.setStock(request.getStock());
            warehouse.setCurrentCapacity(warehouse.getCurrentCapacity() + request.getStock());
        } else {
            throw new RuntimeException("Stock exceeds warehouse capacity. Stock: " + request.getStock() + " Current warehouse capacity: " + (warehouse.getMaxCapacity() - warehouse.getCurrentCapacity()));
        }

        return inventoryRepository.save(inventory);
    }

    public void deleteInventoryById(int id) {
        Inventory inventory = inventoryRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Inventory with id: " + id + " not found"));
        Warehouse warehouse = inventory.getWarehouse();
        
        int stock = inventory.getStock();
        int newCap = warehouse.getCurrentCapacity() - stock;
        warehouse.setCurrentCapacity(newCap);

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
