package com.example.ecommrce.service;
import java.util.List;
import java.util.Optional;

import com.example.ecommrce.entity.Order;
import com.example.ecommrce.entity.OrderItem;
import com.example.ecommrce.entity.Vendor;

public interface VendorService {

    List<Vendor> getAllVendors();

    Optional<Vendor> getVendorById(Long id);

    Vendor createVendor(Vendor vendor);

    Optional<Vendor> updateVendor(Long id, Vendor vendor);

    boolean deleteVendor(Long id);

	List<OrderItem> getOrderByVendorId(Long vendorId);

	 
}