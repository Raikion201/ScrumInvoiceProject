package com.invoicebe.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "purchase_requests")
@Data
public class PurchaseRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerEmail;

    @Column(nullable = false)
    private String customerName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    private BigDecimal depositAmount;

    private LocalDate dueDate;

    @Column(nullable = false)
    private String status; // "pending" or "delivered"

    @Column(nullable = false)
    private boolean paid; // chú ý: getter/setter sẽ là isPaid(), setPaid()

    @Column(nullable = false)
    private LocalDate invoiceDate;

    @Column(nullable = false)
    private String invoiceNumber;
}
