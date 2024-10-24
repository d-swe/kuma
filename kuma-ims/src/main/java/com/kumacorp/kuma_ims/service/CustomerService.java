package com.kumacorp.kuma_ims.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.CustomerRepository;

import jakarta.persistence.EntityNotFoundException;

import com.kumacorp.kuma_ims.model.Customer;

@Service
public class CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> findAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomer(int id) {
        customerRepository.deleteById(id);
    }

    public Optional<Customer> findCustomerById(int id) {
        return customerRepository.findById(id);
    }

    public Customer updateCustomer(int id, Customer newCustomer) {
        return customerRepository.findById(id)
        .map(customer -> {
            customer.setAddress(newCustomer.getAddress());
            customer.setEmail(newCustomer.getEmail());
            customer.setFirstName(newCustomer.getFirstName());
            customer.setLastName(newCustomer.getLastName());
            customer.setPhone(newCustomer.getPhone());
            return customerRepository.save(customer);
        }).orElseThrow(() -> new EntityNotFoundException("Customer with id: " + id + " not found"));
    }
}
