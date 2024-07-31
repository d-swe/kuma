package com.kumacorp.kuma_ims.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kumacorp.kuma_ims.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{
    @Query("SELECT SUM(o.totalAmount) FROM Order o")
    BigDecimal sumTotalAmount(); 
}
