package com.kumacorp.kuma_ims.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kumacorp.kuma_ims.model.Warehouse;
import com.kumacorp.kuma_ims.service.WarehouseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/warehouses")
@CrossOrigin(origins = "http://localhost:5173")
public class WarehouseController {
   
    @Autowired
    private WarehouseService warehouseService;

    @GetMapping
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouse();
    }
    
    @PostMapping
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseService.createWarehouse(warehouse);
    }

    @DeleteMapping("/{id}")
    public void deleteWarehouse(@PathVariable int id) {
        warehouseService.deleteWarehouse(id);
    }

    @PutMapping("/{id}")
    public Warehouse updateWarehouse(@PathVariable int id, @RequestBody Warehouse warehouse) {
        return warehouseService.updateWarehouse(id, warehouse);
    }
}