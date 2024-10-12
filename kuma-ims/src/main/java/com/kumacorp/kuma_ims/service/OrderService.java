package com.kumacorp.kuma_ims.service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.dto.OrderCreateRequest;
import com.kumacorp.kuma_ims.model.Customer;
import com.kumacorp.kuma_ims.model.Order;
import com.kumacorp.kuma_ims.repository.CustomerRepository;
import com.kumacorp.kuma_ims.repository.OrderRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> findOrderById(int id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(OrderCreateRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
            .orElseThrow(() -> new EntityNotFoundException("Customer with id: " + request.getCustomerId() + " not found"));
        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderDate(LocalDate.now());
        order.setTotalCost(request.getTotalCost());

        return orderRepository.save(order);
    }

    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }

    public long getOrderCount() {
        return orderRepository.count();
    }

    // @Transactional
    // public float getTotalCostForAllOrders() {
    //     return orderRepository.calculateTotalCostForAllOrders();
    // }
}
