package com.example.ecommrce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ecommrce.entity.Product;

import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findByVendorId(Long vendorId);
}