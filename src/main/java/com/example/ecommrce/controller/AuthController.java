package com.example.ecommrce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommrce.auth.JwtUtill;
import com.example.ecommrce.dto.JwtResponse;
import com.example.ecommrce.dto.LoginRequest;
import com.example.ecommrce.dto.RegisterRequest;
import com.example.ecommrce.entity.User;
import com.example.ecommrce.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtUtill jwtUtill;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest req){
		if(userRepository.findByUsername(req.getUsername()) != null) {
			return ResponseEntity.badRequest().body("username already exists");
		}
		User u=new User();
		u.setUsername(req.getUsername());
		u.setPassword(passwordEncoder.encode(req.getPassword()));
		u.setRole(req.getRole());
		userRepository.save(u);
		return ResponseEntity.ok("Registered");
		
	}
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest req){
		User user=userRepository.findByUsername(req.getUsername());
		
		boolean match=passwordEncoder.matches(req.getPassword(),user.getPassword());
		if(match) return ResponseEntity.ok(new JwtResponse(jwtUtill.generateToken(req.getUsername(),user.getRole()),user.getRole(),user.getId(),user.getUsername()));
		else return ResponseEntity.status(401).body("Invalid password");
		
	}

//	  public record RegisterRequest(String username, String password, String role) {}
//	  public record LoginRequest(String username, String password) {}
//	  public record JwtResponse(String token, Long customerId) {}
}
