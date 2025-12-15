package com.example.ecommrce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommrce.entity.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {

	Inventory findByProductId(Long productId);
}
