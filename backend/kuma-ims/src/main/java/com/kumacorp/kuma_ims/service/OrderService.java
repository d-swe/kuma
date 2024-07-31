package com.kumacorp.kuma_ims.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.model.Order;
import com.kumacorp.kuma_ims.repository.OrderRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> findOrderById(int id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }

    public Order updateorder(int id, Order newOrder) {
        return orderRepository.findById(id)
            .map(order -> {
                order.setId(newOrder.getId());
                order.setStreet(newOrder.getStreet());
                order.setCity(newOrder.getCity());
                order.setState(newOrder.getState());
                order.setZip(newOrder.getZip());
                order.setOrderDate(newOrder.getOrderDate());
                return orderRepository.save(order);
            }).orElseThrow(() -> new EntityNotFoundException("Order with id: " + id + " not found"));
    }

    public long getOrderCount() {
        return orderRepository.count();
    }

    public BigDecimal getTotalAmount() {
        return orderRepository.sumTotalAmount();
    }
}
