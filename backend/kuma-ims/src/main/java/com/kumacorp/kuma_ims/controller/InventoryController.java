package com.kumacorp.kuma_ims.controller;

import com.kumacorp.kuma_ims.model.Inventory;
import com.kumacorp.kuma_ims.model.Product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kumacorp.kuma_ims.service.InventoryService;

@RestController
@RequestMapping("/inventories")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    @PostMapping
    public Inventory createInventory(@RequestBody Inventory inventory) {
        return inventoryService.createInventory(inventory);
    }

    @GetMapping("/count")
    public long getInventoryCount() {
        return inventoryService.getInventoryCount();
    } 

    @GetMapping("/warehouse/{warehouseId}/products")
    public ResponseEntity<List<Product>> findProductsByWarehouseId(@PathVariable int warehouseId) {
        List<Product> products = inventoryService.findProductsByWarehouse(warehouseId);
        if (!products.isEmpty()) {
            return ResponseEntity.ok(products);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
