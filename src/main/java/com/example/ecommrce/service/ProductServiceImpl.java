package com.example.ecommrce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.ecommrce.entity.Product;
import com.example.ecommrce.repository.ProductRepository;
@Service
public class ProductServiceImpl implements ProductService{
	
	private ProductRepository productRepository;

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return productRepository.findAll();
	}

	@Override
	public Optional<Product> getProductById(Long id) {
		// TODO Auto-generated method stub
		return productRepository.findById(id);
	}

	@Override
	public Product createProduct(Product product) {
		// TODO Auto-generated method stub
		return productRepository.save(product);
	}

	@Override
	public Optional<Product> updateProduct(Long id, Product product) {
		// TODO Auto-generated method stub
		return productRepository.findById(id).map(p->{
			p.setTitle(product.getTitle());
            p.setDescription(product.getDescription());
            p.setPrice(product.getPrice());
            return productRepository.save(p);
		});
	}

	@Override
	public boolean deleteProduct(Long id) {
		if(productRepository.existsById(id)) {
		 productRepository.deleteById(id);
		return true;
		}
		return false;
	}

}
