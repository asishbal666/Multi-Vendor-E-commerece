package com.example.ecommrce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommrce.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	 List<Order>  getOrderByCustomerId(Long customerId);
}
