package com.invoicebe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
@Data
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Purchase request ID is required")
    @OneToOne
    @JoinColumn(name = "purchase_request_id", nullable = false, unique = true)
    private PurchaseRequest purchaseRequest;

    @NotBlank(message = "Bill number is required")
    @Column(unique = true)
    private String billNumber;

    @PositiveOrZero(message = "Amount must be zero or positive")
    private double amount;

    @NotNull(message = "Issue date is required")
    private LocalDate issueDate;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    @NotBlank(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        PENDING, PAID
    }
}