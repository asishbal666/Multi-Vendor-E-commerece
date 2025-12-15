package com.example.ecommrce.controller;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ecommrce.entity.Product;
import com.example.ecommrce.repository.ProductRepository;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class ProductController {
  @Autowired
  private  ProductRepository repo;

  @GetMapping
  public List<Product> list() {
    return repo.findAll();
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestBody Product p) {
    Product saved = repo.save(p);
    return ResponseEntity.ok(saved);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> get(@PathVariable Long id) {
    return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }
  @GetMapping("/getAllProductByVendorId/{vendorId}")
  public List<Product> getAllProductByVendorId(@PathVariable Long vendorId){
	  return repo.findByVendorId(vendorId);
  }
}
