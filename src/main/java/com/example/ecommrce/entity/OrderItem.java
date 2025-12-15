	package com.example.ecommrce.entity;
	import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
	import lombok.*;
	
	@Entity
	@Table(name = "order_items")
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public class OrderItem {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	
	    @ManyToOne
	    @JoinColumn(name = "product_id")
	    private Product product;
	
	    private Integer quantity;
	
	    private Double price;
	
	    @ManyToOne
	    @JoinColumn(name = "order_id")
	    
	    private Order order;
	}