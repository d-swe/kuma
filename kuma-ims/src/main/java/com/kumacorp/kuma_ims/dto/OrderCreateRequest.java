package com.kumacorp.kuma_ims.dto;

import java.math.BigDecimal;

public class OrderCreateRequest {
    private int customerId;
    private BigDecimal totalCost;

    public int getCustomerId() {
        return customerId;
    }
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
    public BigDecimal getTotalCost() {
        return totalCost;
    }
    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }
}
