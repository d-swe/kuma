package com.kumacorp.kuma_ims.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kumacorp.kuma_ims.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer>{
    List<OrderItem> findByProductId(int productId);

    List<OrderItem> findByOrderId(int orderId);

    List<OrderItem> findByProductIdAndOrderId(int productId, int orderId);    
}
