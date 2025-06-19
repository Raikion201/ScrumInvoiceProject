package com.invoicebe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "purchase_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Customer name cannot be empty")
    @Column(nullable = false)
    private String customerName;

    @NotBlank(message = "Customer email cannot be empty")
    @Email(message = "Customer email must be a valid email format")
    @Column(nullable = false)
    private String customerEmail;

    @NotBlank(message = "Description cannot be empty")
    @Column(nullable = false)
    private String description;

    @NotNull(message = "Total amount cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Total amount must be greater than 0")
    @Column(nullable = false)
    private BigDecimal totalAmount;

    @NotNull(message = "Deposit amount cannot be null")
    @DecimalMin(value = "0.0", inclusive = true, message = "Deposit amount must be non-negative")
    @Column(nullable = false)
    private BigDecimal depositAmount;

    @NotNull(message = "Due date cannot be null")
    @Column(nullable = false)
    private LocalDate dueDate;

    @NotBlank(message = "Status cannot be empty")
    @Pattern(
        regexp = "PENDING|DELIVERED|CONVERTED_TO_INVOICE",
        message = "Status must be 'PENDING', 'DELIVERED', or 'CONVERTED_TO_INVOICE'"
    )
    @Column(nullable = false)
    private String status;

    @NotNull(message = "Is Paid status cannot be null")
    @Column(nullable = false)
    private Boolean isPaid;

    @NotNull(message = "Invoice date cannot be null")
    @Column(nullable = false)
    private LocalDate invoiceDate;

    @NotBlank(message = "Invoice number cannot be empty")
    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    // Break the circular reference for JSON serialization
    @JsonManagedReference
    @OneToOne(mappedBy = "purchaseRequest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Invoice invoice;
}
