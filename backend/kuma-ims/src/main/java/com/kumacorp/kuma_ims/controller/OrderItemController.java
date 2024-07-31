package com.kumacorp.kuma_ims.controller;

import com.kumacorp.kuma_ims.model.OrderItem;
import com.kumacorp.kuma_ims.service.OrderItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orderItems")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.findAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<OrderItem> getOrderItemById(@PathVariable int id) {
        return orderItemService.findOrderById(id);
    }

    @PostMapping
    public OrderItem createOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.createOrder(orderItem);
    }

    @DeleteMapping("/{id}")
    public void deleteOrderItem(@PathVariable int id) {
        orderItemService.deleteOrder(id);
    }

    @GetMapping("/product/{productId}")
    public List<OrderItem> getOrderItemsByProductId(@PathVariable int productId) {
        return orderItemService.findOrderItemsByProductId(productId);
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItem> getOrderItemsByOrderId(@PathVariable int orderId) {
        return orderItemService.findOrderItemsByOrderId(orderId);
    }

    @GetMapping("/product/{productId}/order/{orderId}")
    public List<OrderItem> getOrderItemsByProductIdAndOrderId(@PathVariable int productId, @PathVariable int orderId) {
        return orderItemService.findOrderItemsByProductIdAndOrderId(productId, orderId);
    }
}