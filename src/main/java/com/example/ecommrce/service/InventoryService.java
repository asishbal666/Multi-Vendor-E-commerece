package com.example.ecommrce.service;

public interface InventoryService {

	public boolean checkStock(Long productId,int quantity);
	
	public void decreaseStock(Long productId, int quantity);
	
	public void addStock(Long productId, int quantity);
}
