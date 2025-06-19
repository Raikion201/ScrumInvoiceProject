package com.invoicebe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String invoiceNumber;
    
    @Column(nullable = false)
    private String customerName;
    
    @Column(nullable = false)
    private String customerEmail;
    
    @Column(nullable = false)
    private BigDecimal amount;
    
    @Column(nullable = false)
    private LocalDate invoiceDate;
    
    @Column(nullable = false)
    private LocalDate dueDate;
    
    @Column
    private String description;
    
    @Column(nullable = false)
    private Boolean paid;
    
    // Break the circular reference with @JsonBackReference
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "purchase_request_id")
    private PurchaseRequest purchaseRequest;
}
