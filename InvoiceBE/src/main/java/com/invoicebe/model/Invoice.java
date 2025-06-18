package com.invoicebe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_request_id", unique = true) // This creates the foreign key column 'purchase_request_id' in the 'invoices' table
    // 'unique = true' ensures that only one Invoice can be linked to a specific PurchaseRequest (for 1:1 relationship)
    private PurchaseRequest purchaseRequest;
}
