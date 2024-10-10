package com.kumacorp.kuma_ims.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity;

    private LocalDate lastUpdate;

    @OneToMany(mappedBy = "inventory")
    private List<OrderItem> orderItems;

    @ManyToOne(cascade = CascadeType.ALL)
    private Warehouse warehouse;

    @ManyToOne(cascade = CascadeType.ALL)
    private Product product;

    public Inventory() {}

    public Inventory(int id, int quantity) {
        this.id = id;
        this.quantity = quantity;
        this.lastUpdate = LocalDate.now();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }
}