package com.kumacorp.kuma_ims.dto;

import java.math.BigDecimal;

public class OrderItemCreateRequest {

    private int orderId;
    private int inventoryId;
    private BigDecimal pricePer;
    private int quantity;

    public int getOrderId() {
        return orderId;
    }
    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }
    public int getInventoryId() {
        return inventoryId;
    }
    public void setInventoryId(int inventoryId) {
        this.inventoryId = inventoryId;
    }
    public BigDecimal getPricePer() {
        return pricePer;
    }
    public void setPricePer(BigDecimal pricePer) {
        this.pricePer = pricePer;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
