package com.kumacorp.kuma_ims.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.InventoryRepository;

import jakarta.persistence.EntityNotFoundException;

import com.kumacorp.kuma_ims.model.Inventory;

@Service
public class InventoryService {
   
    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> findAllInventories() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> findInventoryById(int id) {
        return inventoryRepository.findById(id);
    }

    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public void deleteInventoryById(int id) {
        inventoryRepository.deleteById(id);
    }

    public Inventory updateInventory(int id, Inventory newInventory) {
        return inventoryRepository.findById(id)
        .map(inventory -> {
            inventory.setQuantity(newInventory.getQuantity());
            return inventoryRepository.save(inventory);
        }).orElseThrow(() -> new EntityNotFoundException("Inventory with id: " + id + " not found"));
    }
}
