package com.kumacorp.kuma_ims.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.InventoryRepository;
import com.kumacorp.kuma_ims.repository.OrderItemRepository;
import com.kumacorp.kuma_ims.repository.OrderRepository;

import jakarta.persistence.EntityNotFoundException;

import com.kumacorp.kuma_ims.dto.OrderItemCreateRequest;
import com.kumacorp.kuma_ims.model.Inventory;
import com.kumacorp.kuma_ims.model.Order;
import com.kumacorp.kuma_ims.model.OrderItem;

@Service
public class OrderItemService {
    
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderItem> findAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public OrderItem createOrderItem(OrderItemCreateRequest request) {
        Inventory inventory = inventoryRepository.findById(request.getInventoryId())
            .orElseThrow(() -> new EntityNotFoundException("Inventory with id: " + request.getInventoryId() + " not found"));
        Order order = orderRepository.findById(request.getOrderId())
            .orElseThrow(() -> new EntityNotFoundException("Order with id: " + request.getOrderId() + " not found"));
        
        OrderItem orderItem = new OrderItem();
        orderItem.setInventory(inventory);
        orderItem.setOrder(order);
        orderItem.setQuantity(request.getQuantity());

        return orderItemRepository.save(orderItem);
    }

    public void deleteOrderItem(int id) {
        orderItemRepository.deleteById(id);
    }
    
    public OrderItem updateOrderItem(int id, OrderItem newOrderItem) {
        return orderItemRepository.findById(id)
            .map(orderItem -> {
                orderItem.setInventory(newOrderItem.getInventory());
                orderItem.setOrder(newOrderItem.getOrder());
                orderItem.setQuantity(newOrderItem.getQuantity());
                return orderItemRepository.save(orderItem);
            }).orElseThrow(() -> new EntityNotFoundException("OrderItem with id: " + id + " not found"));
    }
}