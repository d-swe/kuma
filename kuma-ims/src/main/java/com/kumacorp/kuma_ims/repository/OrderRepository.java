package com.kumacorp.kuma_ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kumacorp.kuma_ims.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{
    // @Query("SELECT SUM(o.quantity * p.price) FROM Order o JOIN Product p ON o.productId = p.id")
    // float calculateTotalCostForAllOrders();
}
