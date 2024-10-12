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

import com.kumacorp.kuma_ims.service.CustomerService;
import com.kumacorp.kuma_ims.model.Customer;

@RestController
@RequestMapping("customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {
    
    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> findAllCustomers() {
        return customerService.findAllCustomers();
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(int id) {
        customerService.deleteCustomer(id);
    }   
}
