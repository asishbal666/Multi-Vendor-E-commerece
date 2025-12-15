package com.example.ecommrce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommrce.dto.OrderItemRequest;
import com.example.ecommrce.dto.OrderRequest;
import com.example.ecommrce.entity.Order;
import com.example.ecommrce.service.InventoryService;
import com.example.ecommrce.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class OrderController {
	@Autowired
	private InventoryService inventoryService;
	
	@Autowired
	private OrderService orderService;
	

	@PostMapping("/place")
	public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest) {
			
		for(OrderItemRequest orderItemReq:orderRequest.getItems()) {
	    	boolean inStock=inventoryService.checkStock(orderItemReq.getProductId().getId(), orderItemReq.getQuantity());
	    	if(!inStock) return ResponseEntity
            .badRequest()
            .body("Product " + orderItemReq.getProductId() + " is out of stock");
	    
	    }
		for(OrderItemRequest orderItemReq:orderRequest.getItems()) {
			inventoryService.decreaseStock(orderItemReq.getProductId().getId(),orderItemReq.getQuantity());
		}
		Order order=orderService.createOrder(orderRequest);
		if(order!=null) return ResponseEntity.ok(order.getId());
		return ResponseEntity.badRequest().body("Error in placing order");
		
}
	@GetMapping("/customer/{customerId}")
	
	public  List<Order> getOrderByCustomer(@PathVariable Long customerId) {
		return orderService.getOrderByCustomerId(customerId);
	}
	@GetMapping("/getAll")	
	@PreAuthorize("hasRole('ADMIN')")
	public  List<Order> getOrderByCustomer() {
		return orderService.getAllOrders();
	}
	
	@PutMapping("/{orderId}/status")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateStatus(@PathVariable Long orderId,@RequestParam("status") String status){
		orderService.updateStatus(orderId, status);
		return ResponseEntity.ok("Status updated"+status);
	}
	

}
