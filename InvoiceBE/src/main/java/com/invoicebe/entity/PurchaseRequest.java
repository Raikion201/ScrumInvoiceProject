package com.invoicebe.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "purchase_requests")
@Data
public class PurchaseRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Customer email is required")
    @Email(message = "Invalid email format")
    private String customerEmail;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Description is required")
    @Column(columnDefinition = "TEXT")
    private String description;

    @PositiveOrZero(message = "Total amount must be zero or positive")
    private double totalAmount;

    @PositiveOrZero(message = "Deposit amount must be zero or positive")
    private double depositAmount;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    @NotBlank(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private Status status;

    @NotNull(message = "Is paid is required")
    private boolean isPaid;

    private LocalDate invoiceDate;

    private String invoiceNumber;

    public enum Status {
        PENDING, DELIVERED
    }
}