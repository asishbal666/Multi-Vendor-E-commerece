package com.example.ecommrce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String description;
  private Double price;
  @ManyToOne
  @JoinColumn(name="vendor_id")
  @JsonIgnore
  private Vendor vendor; // link to vendor user id
}
