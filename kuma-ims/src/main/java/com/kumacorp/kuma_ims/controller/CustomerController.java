package com.kumacorp.kuma_ims.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public void deleteCustomer(@PathVariable int id) {
        customerService.deleteCustomer(id);
    }   

    @GetMapping("/{id}")
    public ResponseEntity<Customer> findCustomerById(@PathVariable int id) {
        Optional<Customer> customer = customerService.findCustomerById(id);
        if(customer.isPresent())
            return ResponseEntity.ok(customer.get());
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
