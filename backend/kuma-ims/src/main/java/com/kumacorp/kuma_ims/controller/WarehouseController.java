package com.kumacorp.kuma_ims.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kumacorp.kuma_ims.model.Warehouse;
import com.kumacorp.kuma_ims.service.WarehouseService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/warehouses")
@CrossOrigin(origins = "http://localhost:5173")
public class WarehouseController {
   
    @Autowired
    private WarehouseService warehouseService;

    @GetMapping
    public List<Warehouse> getAllWarehouse() {
        return warehouseService.getAllWarehouse();
    }
    
    @PostMapping
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseService.createWarehouse(warehouse);
    }
}