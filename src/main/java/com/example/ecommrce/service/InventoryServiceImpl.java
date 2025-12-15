package com.example.ecommrce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommrce.entity.Inventory;
import com.example.ecommrce.repository.InventoryRepository;
@Service
public class InventoryServiceImpl implements InventoryService{

	@Autowired
	private InventoryRepository inventoryRepository;
	
	@Override
	public boolean checkStock(Long productId, int quantity) {
		Inventory inventory=inventoryRepository.findById(productId).orElseThrow();
		if(inventory.getQuantity()<quantity) return false;
		return true;
	}

	@Override
	public void decreaseStock(Long productId, int quantity) {
		Inventory inventory=inventoryRepository.findById(productId).orElseThrow();
		inventory.setQuantity(inventory.getQuantity()-quantity);
		inventoryRepository.save(inventory);	
	}

	@Override
	public void addStock(Long productId, int quantity) {
		Inventory inventory=inventoryRepository.findById(productId).orElseThrow();
		inventory.setQuantity(inventory.getQuantity()+quantity);
		inventoryRepository.save(inventory);	
		
	}

}
