package com.kumacorp.kuma_ims.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.WarehouseRepository;
import com.kumacorp.kuma_ims.model.Warehouse;

@Service
public class WarehouseService {
    
    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<Warehouse> getAllWarehouse() {
        return warehouseRepository.findAll();
    }

    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }
}
