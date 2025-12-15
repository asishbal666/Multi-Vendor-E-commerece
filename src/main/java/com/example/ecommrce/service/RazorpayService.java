package com.example.ecommrce.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
@Service
public class RazorpayService {

	    @Value("${razorpay.key.id}")
	    private String keyId;

	    @Value("${razorpay.key.secret}")
	    private String keySecret;

	    public Order createRazorpayOrder(Double amount) throws RazorpayException {
	        RazorpayClient client = new RazorpayClient(keyId, keySecret);

	        JSONObject options = new JSONObject();
	        options.put("amount", amount * 100); 
	        options.put("currency", "INR");
	        options.put("receipt", "rcpt_" + System.currentTimeMillis());

	        return client.orders.create(options);
	    }
}
