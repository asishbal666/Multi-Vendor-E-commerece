package com.example.ecommrce.dto;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class OrderRequest {
    private Long customerId;
    private List<OrderItemRequest> items;
}

