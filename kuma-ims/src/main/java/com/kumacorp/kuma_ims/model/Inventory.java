package com.kumacorp.kuma_ims.model;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int stock;

    private LocalDate lastUpdate;

    // @OneToMany(mappedBy = "inventory")
    // private List<OrderItem> orderItems;

    @ManyToOne(cascade = CascadeType.ALL)
    private Warehouse warehouse;

    @ManyToOne(cascade = CascadeType.ALL)
    private Product product;

    public Inventory() {}

    public Inventory(int id, Product product, Warehouse warehouse, int stock, LocalDate lastUpdate) {
        this.id = id;
        this.product = product;
        this.warehouse = warehouse;
        this.stock = stock;
        this.lastUpdate = lastUpdate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}