package com.example.ecommrce.service;

import java.util.List;
import java.util.Optional;

import com.example.ecommrce.entity.Product;

public interface ProductService {

    List<Product> getAllProducts();

    Optional<Product> getProductById(Long id);

    Product createProduct(Product product);

    Optional<Product> updateProduct(Long id, Product product);

    boolean deleteProduct(Long id);
}