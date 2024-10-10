package com.kumacorp.kuma_ims.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.WarehouseRepository;

import jakarta.persistence.EntityNotFoundException;

import com.kumacorp.kuma_ims.model.Warehouse;

@Service
public class WarehouseService {
    
    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<Warehouse> findAllWarehouse() {
        return warehouseRepository.findAll();
    }

    public Optional<Warehouse> findWarehouseById(int id) {
        return warehouseRepository.findById(id);
    }

    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public void deleteWarehouse(int id) {
        warehouseRepository.deleteById(id);
    }

    public Warehouse updateWarehouse(int id, Warehouse newWarehouse) {
        return warehouseRepository.findById(id)
            .map(warehouse -> {
                warehouse.setName(newWarehouse.getName());
                warehouse.setCity(newWarehouse.getCity());
                warehouse.setState(newWarehouse.getState());
                warehouse.setCapacity(newWarehouse.getCapacity());
                return warehouseRepository.save(warehouse);
            }).orElseThrow(() -> new EntityNotFoundException("Warehouse with id: " + id + " not found"));
    }

    public long getWarehouseCount() {
        return warehouseRepository.count();
    }
}
