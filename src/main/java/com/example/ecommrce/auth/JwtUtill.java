package com.example.ecommrce.auth;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtill {

	private Key key;
	private Long expirationMs;
	
	public JwtUtill(@Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-ms}") long expirationMs) {
       
	    this.key = Keys.hmacShaKeyFor(secret.getBytes());
	    this.expirationMs = expirationMs;
	}
	 
	public String generateToken(String username,String role) {
		Date now=new Date();
		Date exp=new Date(now.getTime()+expirationMs);
		
		return Jwts.builder()
				.setSubject(username)
				.claim("role", role)
				.setIssuedAt(now)
				.setExpiration(exp)
				.signWith(key)
				.compact();
				
				
	}
	 public Claims extractClaims(String token) {
	        return Jwts.parserBuilder()
	                .setSigningKey(key)
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	    }
 
	public String extractUsername(String token) {
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
	}
	
	public boolean validate(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		
		}
		catch(JwtException jt) {
			return false;
		}
		
	}
	
 public String extractRole(String token) {
	 return extractClaims(token).get("role",String.class);
 }
}
