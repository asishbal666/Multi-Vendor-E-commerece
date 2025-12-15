package com.example.ecommrce.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommrce.dto.CartRequest;
import com.example.ecommrce.entity.Cart;
import com.example.ecommrce.entity.CartItem;
import com.example.ecommrce.repository.CartItemRepository;
import com.example.ecommrce.repository.CartRepository;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class CartServiceImpl implements CartService {
	@Autowired
	private CartRepository cartRepo;
	@Autowired
	private CartItemRepository cartItemRepo;

	@Override
	public Cart getCartByCustomerId(Long customerId) {
		// TODO Auto-generated method stub
		return cartRepo.getCartByCustomerId(customerId);
	}

	@Override
	public Cart addItemToCart(CartRequest request) {
		// TODO Auto-generated method stub
		Cart cart=cartRepo.getCartByCustomerId(request.getCustomerId());
        log.debug("Cart data: {}", cart);

        if (cart == null) {
            log.warn("No cart found for customerId: {}",request.getCustomerId());
        }
	    if(cart!=null) {
	    	for(CartItem item:cart.getItems()){
	    		if(item.getProduct().getId().equals(request.getProduct().getId())) {
	    		   item.setQuantity(request.getQuantity()+item.getQuantity());
	    		   return cartRepo.save(cart);
	    		}	
	    	}
	    	CartItem item=new CartItem();
		    item.setProduct(request.getProduct());
		    item.setQuantity(request.getQuantity());
		    item.setCart(cart);
		    cart.getItems().add(item);
		    return cartRepo.save(cart);
		    
	    }
	    Cart newCart=new Cart();
	    CartItem item=new CartItem();
	    item.setProduct(request.getProduct());
	    item.setQuantity(request.getQuantity());
	    item.setCart(newCart);
	   
	    newCart.setCustomerId(request.getCustomerId());
	    newCart.setItems(List.of(item));

		return cartRepo.save(newCart);
	}

	@Override
	public Cart updateItemQuantity(Long customerId, Long productId, Integer quantity) {
		Cart cart=cartRepo.getCartByCustomerId(customerId);
		for(CartItem item:cart.getItems()){
    		if(item.getProduct().getId().equals(productId)) {
    		   item.setQuantity(quantity+item.getQuantity());
    		   cartRepo.save(cart);
    		}
		}
		return cart;
		
		
		
	}

	@Override
	public void removeItemFromCart(Long  cartItemId) {
		  cartItemRepo.deleteById(cartItemId);
	}

	@Override
	public Cart clearCart(Long customerId) {
		Cart cart=cartRepo.getCartByCustomerId(customerId);
		cart.getItems().clear();
		return cartRepo.save(cart);
	}

}
