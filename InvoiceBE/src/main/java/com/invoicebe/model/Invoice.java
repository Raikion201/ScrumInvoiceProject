package com.invoicebe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    
    @Column(nullable = false)
    public String invoiceNumber;
    
    @Column(nullable = false)
    public String customerName;
    
    public String customerEmail;
    
    @Column(nullable = false)
    public BigDecimal amount;
    
    @Column(nullable = false)
    public LocalDate invoiceDate;
    
    public LocalDate dueDate;
    
    @Column(columnDefinition = "TEXT")
    public String description;
    
    public boolean paid;
}
