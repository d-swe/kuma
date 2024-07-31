package com.kumacorp.kuma_ims.service;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.InventoryRepository;
import com.kumacorp.kuma_ims.model.Inventory;

@Service
public class InventoryService {
    
    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Inventory createInventory(Inventory inventory) {
        inventory.setLastUpdate(OffsetDateTime.now());
        return inventoryRepository.save(inventory);
    }

    public long getInventoryCount() {
        return inventoryRepository.count();
    }

    public void deleteInventory(int id) {
        inventoryRepository.deleteById(id);
    }
}
