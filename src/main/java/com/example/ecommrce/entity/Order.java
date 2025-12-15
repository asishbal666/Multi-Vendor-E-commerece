package com.example.ecommrce.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;

    private Double totalAmount;

    private String status; // PENDING, PAID, SHIPPED, CANCELLED
    private String paymentMethod;
    private Date createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<OrderItem> items;
}