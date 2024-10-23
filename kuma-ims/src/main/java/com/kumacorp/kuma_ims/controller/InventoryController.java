package com.kumacorp.kuma_ims.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kumacorp.kuma_ims.service.InventoryService;
import com.kumacorp.kuma_ims.dto.InventoryCreateRequest;
import com.kumacorp.kuma_ims.model.Inventory;

@RestController
@RequestMapping("/inventories")
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "http://kuma-frontend.s3-website-us-east-1.amazonaws.com")
public class InventoryController {
    
    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<Inventory> findAllInventories() {
        return inventoryService.findAllInventories();
    }

    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody InventoryCreateRequest request) {
        Inventory inventory = inventoryService.saveInventory(request);
        if(inventory != null)
            return ResponseEntity.ok(inventory);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> findInventoryById(@PathVariable int id) {
        Optional<Inventory> inventories = inventoryService.findInventoryById(id);
        if(inventories.isPresent())
            return ResponseEntity.ok(inventories.get());
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable int id) {
        inventoryService.deleteInventoryById(id);
    }

    @PutMapping("/{id}")
    public Inventory updateInventory(@PathVariable int id, Inventory inventory) {
        return inventoryService.updateInventory(id, inventory);
    }

}
