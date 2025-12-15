package com.example.ecommrce.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommrce.entity.Order;
import com.example.ecommrce.repository.OrderRepository;
import com.example.ecommrce.service.RazorpayService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @Autowired
    private OrderRepository orderRepository;

    @Value("${razorpay.key.id}")
    private String keyId;

    // 1. Create Razorpay Order
    @PostMapping("/create/{orderId}")
    public ResponseEntity<?> createPayment(@PathVariable Long orderId) throws Exception {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        com.razorpay.Order razorpayOrder =
                razorpayService.createRazorpayOrder(order.getTotalAmount());

        Map<String, Object> response = new HashMap();
        response.put("key", keyId);
        response.put("amount", razorpayOrder.get("amount"));
        response.put("razorpayOrderId", razorpayOrder.get("id"));
        response.put("orderId", order.getId());

        return ResponseEntity.ok(response);
    }

    // 2. After Successful Payment
    @PostMapping("/success")
    public ResponseEntity<?> paymentSuccess(@RequestBody Map<String, String> data){

        Long orderId = Long.parseLong(data.get("orderId"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("PAID");
        order.setPaymentMethod("RAZORPAY");

        orderRepository.save(order);

        return ResponseEntity.ok("Payment Successful");
    }
}
