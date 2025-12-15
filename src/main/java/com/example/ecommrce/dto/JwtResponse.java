package com.example.ecommrce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class JwtResponse {

	private String token;
	private String role;
	private Long userId;
	private String username;
	
}
