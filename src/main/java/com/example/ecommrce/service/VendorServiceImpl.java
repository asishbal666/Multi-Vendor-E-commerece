package com.example.ecommrce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommrce.entity.Order;
import com.example.ecommrce.entity.OrderItem;
import com.example.ecommrce.entity.Product;
import com.example.ecommrce.entity.Vendor;
import com.example.ecommrce.repository.OrderItemRepository;
import com.example.ecommrce.repository.OrderRepository;
import com.example.ecommrce.repository.VendorRepository;
@Service
public class VendorServiceImpl implements VendorService{
	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private OrderItemRepository orderItemRepo;

	@Override
	public List<Vendor> getAllVendors() {
		// TODO Auto-generated method stub
		return vendorRepo.findAll();
	}

	@Override
	public Optional<Vendor> getVendorById(Long id) {
		// TODO Auto-generated method stub
		return vendorRepo.findById(id);
	}

	@Override
	public Vendor createVendor(Vendor vendor) {
		// TODO Auto-generated method stub
		return vendorRepo.save(vendor);
	}

	@Override
	public Optional<Vendor> updateVendor(Long id, Vendor vendor) {
		return vendorRepo.findById(id).map(v->{
			v.setAddress(vendor.getAddress());
			v.setShopName(vendor.getShopName());
			v.setUserId(vendor.getUserId());
			return vendorRepo.save(v);
		});
				
	}

	@Override
	public boolean deleteVendor(Long id) {
		if(vendorRepo.existsById(id)) {
			vendorRepo.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public List<OrderItem> getOrderByVendorId(Long vendorId) {
		return orderItemRepo.findByVendorId(vendorId);
	}

}
