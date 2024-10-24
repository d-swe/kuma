package com.kumacorp.kuma_ims.service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.dto.OrderCreateRequest;
import com.kumacorp.kuma_ims.model.Customer;
import com.kumacorp.kuma_ims.model.Inventory;
import com.kumacorp.kuma_ims.model.Order;
import com.kumacorp.kuma_ims.model.Warehouse;
import com.kumacorp.kuma_ims.repository.CustomerRepository;
import com.kumacorp.kuma_ims.repository.InventoryRepository;
import com.kumacorp.kuma_ims.repository.OrderRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> findOrderById(int id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order createOrder(OrderCreateRequest request) {
        System.out.println("Saving new order");
        Customer customer = customerRepository.findById(request.getCustomerId())
            .orElseThrow(() -> new EntityNotFoundException("Customer with id: " + request.getCustomerId() + " not found"));
        Inventory inventory = inventoryRepository.findById(request.getInventoryId())
            .orElseThrow(() -> new EntityNotFoundException("Inventory with id: " + request.getInventoryId() + " not found"));
            
        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderDate(LocalDate.now());

        if(inventory.getStock() >= request.getQuantity()) {
            int newStock = inventory.getStock() - request.getQuantity();
            inventory.setStock(newStock);
            order.setQuantity(request.getQuantity());
            BigDecimal perItemCost = inventory.getProduct().getPrice();
            order.setPerItemCost(perItemCost);
            // udpdate warehouse stock
            Warehouse warehouse = inventory.getWarehouse();
            int currCap = warehouse.getCurrentCapacity();
            int newCap = currCap - request.getQuantity();
            warehouse.setCurrentCapacity(newCap);
        } else {
            throw new RuntimeException("Cannot fulfill order. Order quantity exceeds current inventory stock. \nOrder quantity: " 
            + request.getQuantity() + "\nProduct: " + inventory.getProduct().getName() + " current stock at: " + inventory.getStock());
        }

        order.setInventory(inventory);

        return orderRepository.save(order);
    }

    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }

    public long getOrderCount() {
        return orderRepository.count();
    }
}
