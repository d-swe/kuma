package com.kumacorp.kuma_ims.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kumacorp.kuma_ims.service.OrderItemService;
import com.kumacorp.kuma_ims.dto.OrderItemCreateRequest;
import com.kumacorp.kuma_ims.model.OrderItem;

@RestController
@RequestMapping("/orderitems")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping
    public List<OrderItem> findAllOrderItems() {
        return orderItemService.findAllOrderItems();
    }

    @DeleteMapping("/{id}")
    public void deleteOrderItem(int id) {
        orderItemService.deleteOrderItem(id);
    }

    @PostMapping
    public OrderItem createOrderItem(@RequestBody OrderItemCreateRequest request) {
        return orderItemService.createOrderItem(request);
    }
}
