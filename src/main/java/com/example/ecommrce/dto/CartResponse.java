package com.example.ecommrce.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartResponse {
	private Long cartId;
	private Long customerId;
	private List<CartItemsResponse> items;

}
