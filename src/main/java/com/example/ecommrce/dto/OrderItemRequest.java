package com.example.ecommrce.dto;

import com.example.ecommrce.entity.Product;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class OrderItemRequest {
    private Product productId;
    private Integer quantity;
    private Double price;
}
