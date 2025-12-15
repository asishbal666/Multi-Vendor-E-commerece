package com.example.ecommrce.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String username;

  @Column(nullable = false)
  private String password;

  // simple role string for starter: "ROLE_ADMIN", "ROLE_VENDOR", "ROLE_CUSTOMER"
  private String role;
}

