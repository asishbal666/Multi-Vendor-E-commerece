package com.example.ecommrce.service;

import com.example.ecommrce.dto.CartRequest;
import com.example.ecommrce.entity.Cart;

public interface CartService {

	Cart getCartByCustomerId(Long customerId);

    Cart addItemToCart(CartRequest request);

    Cart updateItemQuantity(Long customerId, Long productId, Integer quantity);

    void removeItemFromCart(Long cartItemId);

    Cart clearCart(Long customerId);
}
