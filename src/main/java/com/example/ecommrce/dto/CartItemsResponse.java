package com.example.ecommrce.dto;

import com.example.ecommrce.entity.Product;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartItemsResponse {

	private Long cartItemId;
	private Product product;
    private Integer quantity;

}
