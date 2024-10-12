package com.kumacorp.kuma_ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kumacorp.kuma_ims.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    
}
