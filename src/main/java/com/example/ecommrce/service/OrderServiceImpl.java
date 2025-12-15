		package com.example.ecommrce.service;
		
		import java.util.ArrayList;
import java.util.Date;
		import java.util.List;
		import java.util.Optional;
		
		import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommrce.dto.OrderItemRequest;
import com.example.ecommrce.dto.OrderRequest;
		import com.example.ecommrce.entity.Order;
import com.example.ecommrce.entity.OrderItem;
import com.example.ecommrce.repository.OrderRepository;
@Service
		public class OrderServiceImpl implements OrderService{
			@Autowired
			private OrderRepository orderRepo;
		
			
			@Override
			public List<Order> getAllOrders() {
				// TODO Auto-generated method stub
				return orderRepo.findAll();
			}
		
			@Override
			public  List<Order> getOrderByCustomerId(Long id) {
				// TODO Auto-generated method stub
				return orderRepo.getOrderByCustomerId(id);
			}
		
			@Override
			public Order createOrder(OrderRequest req) {
				Order order=new Order();
				order.setCustomerId(req.getCustomerId());
				order.setStatus("PENDING");
				order.setCreatedAt(new Date());
				
				List<OrderItem> itemList=new ArrayList<>();
				double totalAmount=0.0;
				
				for(OrderItemRequest itemReq:req.getItems()) {
					OrderItem orderItem=new OrderItem();
					orderItem.setProduct(itemReq.getProductId());
					orderItem.setQuantity(itemReq.getQuantity());
					orderItem.setPrice(itemReq.getPrice());
					orderItem.setOrder(order);

				        totalAmount += itemReq.getPrice() * itemReq.getQuantity();
				        itemList.add(orderItem);	
					
				}
				order.setItems(itemList);
				order.setTotalAmount(totalAmount);
				
				return orderRepo.save(order);
				
			}
		
			@Override
			public Optional<Order> updateStatus(Long id, String status) {
				return orderRepo.findById(id).map(o->{
					o.setStatus(status);
					return orderRepo.save(o);
				});
			}
			
			
		
		}
