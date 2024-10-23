package com.kumacorp.kuma_ims.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "http://kuma-frontend.s3-website-us-east-1.amazonaws.com")
public class WarehouseController {
   
    @Autowired
    private WarehouseService warehouseService;

    @GetMapping
    public List<Warehouse> findAllWarehouses() {
        return warehouseService.findAllWarehouse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> findWarehouseById(@PathVariable int id) {
        Optional<Warehouse> warehouse = warehouseService.findWarehouseById(id);
        if (warehouse.isPresent())
        return ResponseEntity.ok(warehouse.get());
            else
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/count")
    public long getWarehouseCount() {
        return warehouseService.getWarehouseCount();
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