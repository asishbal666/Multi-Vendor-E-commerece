package com.example.ecommrce.controller;

import com.example.ecommrce.dto.CartItemsResponse;
import com.example.ecommrce.dto.CartRequest;
import com.example.ecommrce.dto.CartResponse;
import com.example.ecommrce.entity.Cart;
import com.example.ecommrce.entity.CartItem;
import com.example.ecommrce.repository.CartItemRepository;
import com.example.ecommrce.service.CartService;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("http://localhost:3000")
@AllArgsConstructor
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private CartItemRepository cartItemRepo;

    @PostMapping("/add")
    public Object addToCart(@RequestBody CartRequest request) {
        return cartService.addItemToCart(request);
    }

    @GetMapping("/{customerId}")
    public CartResponse getCart(@PathVariable Long customerId) {
       Cart cart=cartService.getCartByCustomerId(customerId);
       CartResponse cartResponse=new CartResponse();
       cartResponse.setCartId(cart.getId());
       cartResponse.setCustomerId(customerId);
       
       cartResponse.setItems(new ArrayList<>());
       for(CartItem item:cart.getItems()) {
    	   CartItemsResponse cartItemsResponse=new CartItemsResponse();
    	   cartItemsResponse.setCartItemId(item.getId());
    	   cartItemsResponse.setProduct(item.getProduct());
    	   cartItemsResponse.setQuantity(item.getQuantity());
    	   cartResponse.getItems().add(cartItemsResponse);
       }

       return cartResponse;
        
    }

    @DeleteMapping("/remove/{cartItemId}")
    public void removeFromCart(@PathVariable Long cartItemId) {
         cartService.removeItemFromCart(cartItemId);
    }
    @PutMapping("/increase/{cartItemId}")
    public void increaseQuantity(@PathVariable Long cartItemId) {
    	CartItem cartItem =cartItemRepo.findById(cartItemId).orElseThrow();
    	cartItem.setQuantity(cartItem.getQuantity()+1);
    	cartItemRepo.save(cartItem);
    }
    @PutMapping("/decrease/{cartItemId}")
    public void decreaseQuantity(@PathVariable Long cartItemId) {
    	CartItem cartItem =cartItemRepo.findById(cartItemId).orElseThrow();
    	cartItem.setQuantity(cartItem.getQuantity()-1);
    	cartItemRepo.save(cartItem);
    }
}
