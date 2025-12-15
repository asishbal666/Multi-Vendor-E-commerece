package com.example.ecommrce.dto;

import com.example.ecommrce.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class CartRequest {

	
	private Long customerId;
	private Product product;
	private Integer quantity;
}
