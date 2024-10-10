package com.kumacorp.kuma_ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kumacorp.kuma_ims.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
