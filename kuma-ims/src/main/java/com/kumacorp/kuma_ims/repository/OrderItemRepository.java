package com.kumacorp.kuma_ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kumacorp.kuma_ims.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
}
