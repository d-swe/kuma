package com.kumacorp.kuma_ims.service;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.InventoryRepository;
import com.kumacorp.kuma_ims.repository.ProductRepository;
import com.kumacorp.kuma_ims.repository.WarehouseRepository;
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
    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    // public Inventory createInventory(Inventory inventory) {
    //     return inventoryRepository.save(inventory);
    // }

    public long getInventoryCount() {
        return inventoryRepository.count();
    }

    public void deleteInventory(int id) {
        inventoryRepository.deleteById(id);
    }

    public List<Product> findProductsByWarehouse(int warehouseId) {
        return inventoryRepository.findProductsByWarehouse(warehouseId);
    }

    // public Inventory createInventoryItem(int productId, int warehouseId, long quantity) {
    //     // Fetch the Product and Warehouse using their IDs
    //     Product product = productRepository.findById(productId)
    //             .orElseThrow(() -> new IllegalArgumentException("Product not found"));
    //     Warehouse warehouse = warehouseRepository.findById(warehouseId)
    //             .orElseThrow(() -> new IllegalArgumentException("Warehouse not found"));

    //     // Create a new Inventory item
    //     Inventory inventory = new Inventory();
    //     inventory.setProduct(product);
    //     inventory.setWarehouse(warehouse);
    //     inventory.setQuantity(quantity);
    //     inventory.setLastUpdate(LocalDate.now());

    //     return inventoryRepository.save(inventory);
    // }
}
