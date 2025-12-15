package com.example.ecommrce.service;
import java.util.List;
import java.util.Optional;

import com.example.ecommrce.dto.OrderRequest;
import com.example.ecommrce.entity.Order;

public interface OrderService {

    List<Order> getAllOrders();

    List<Order> getOrderByCustomerId(Long id);

    Order createOrder(OrderRequest req);

    Optional<Order> updateStatus(Long id, String status);

    // DTO
//    public record OrderRequest(Long customerId, Double totalAmount, List<OrderItem> items) {}
}