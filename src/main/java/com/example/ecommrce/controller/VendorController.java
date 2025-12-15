package com.example.ecommrce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

 import com.example.ecommrce.entity.OrderItem;
import com.example.ecommrce.entity.Vendor;
import com.example.ecommrce.repository.CartItemRepository;
import com.example.ecommrce.repository.VendorRepository;
import com.example.ecommrce.service.CartService;
import com.example.ecommrce.service.VendorService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin("http://localhost:3000")
@AllArgsConstructor
public class VendorController {

    @Autowired
    private VendorService vendorService;
    @Autowired
    private VendorRepository venderRepo;
    
    @PostMapping
    public Object createVendor(@RequestBody Vendor vendor) {
        return vendorService.createVendor(vendor);
    }

    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @GetMapping("/{id}")
    public Object getVendor(@PathVariable Long id) {
        return vendorService.getVendorById(id);
    }

    @PutMapping("/{id}")
    public Object updateVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        return vendorService.updateVendor(id, vendor);
    }

    @DeleteMapping("/{id}")
    public Object deleteVendor(@PathVariable Long id) {
        return vendorService.deleteVendor(id);
    }
    
    @GetMapping("/getVendorByUser/{userId}")
    public Vendor getVendorByUserId(@PathVariable Long userId) {
        return venderRepo.getVendorByUserId(userId);
       
    }
    @GetMapping("/getOrderByVendor/{vendorId}")
    public List<OrderItem> getOrdersByVendorId(@PathVariable Long vendorId) {
        return vendorService.getOrderByVendorId(vendorId);
       
    }

    
}
