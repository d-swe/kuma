package com.kumacorp.kuma_ims.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.OrderItemRepository;
import com.kumacorp.kuma_ims.model.OrderItem;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<OrderItem> findAllOrders() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> findOrderById(int id) {
        return orderItemRepository.findById(id);
    }

    public OrderItem createOrder(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public void deleteOrder(int id) {
        orderItemRepository.deleteById(id);
    }

    public long getOrderCount() {
        return orderItemRepository.count();
    }
    public List<OrderItem> findOrderItemsByProductId(int productId) {
        return orderItemRepository.findByProductId(productId);
    }

    // Retrieve order items by orderId
    public List<OrderItem> findOrderItemsByOrderId(int orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    // Retrieve order items by productId and orderId
    public List<OrderItem> findOrderItemsByProductIdAndOrderId(int productId, int orderId) {
        return orderItemRepository.findByProductIdAndOrderId(productId, orderId);
    }    
}
