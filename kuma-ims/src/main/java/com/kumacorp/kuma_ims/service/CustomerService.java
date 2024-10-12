package com.kumacorp.kuma_ims.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kumacorp.kuma_ims.repository.CustomerRepository;
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
}
