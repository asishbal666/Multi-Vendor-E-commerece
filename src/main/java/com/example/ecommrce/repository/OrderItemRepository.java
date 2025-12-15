package com.example.ecommrce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.ecommrce.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

	@Query("SELECT oi FROM OrderItem oi WHERE oi.product.vendor.id = :vendorId")
	List<OrderItem> findByVendorId(Long vendorId);

}
