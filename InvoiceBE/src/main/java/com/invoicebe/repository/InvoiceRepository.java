package com.invoicebe.repository;

import com.invoicebe.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByCustomerName(String customerName);
    List<Invoice> findByInvoiceDateBetween(LocalDate startDate, LocalDate endDate);
    List<Invoice> findByPaid(boolean paid);
}
