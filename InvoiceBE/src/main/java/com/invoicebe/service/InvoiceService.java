package com.invoicebe.service;

import com.invoicebe.model.Invoice;
import com.invoicebe.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    
    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }
    
    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }
    
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }
    
    public Optional<Invoice> updateInvoice(Long id, Invoice invoiceDetails) {
        return invoiceRepository.findById(id)
                .map(existingInvoice -> {
                    // Direct field access instead of using getters
                    if (invoiceDetails.invoiceNumber != null) {
                        existingInvoice.invoiceNumber = invoiceDetails.invoiceNumber;
                    }
                    if (invoiceDetails.customerName != null) {
                        existingInvoice.customerName = invoiceDetails.customerName;
                    }
                    if (invoiceDetails.customerEmail != null) {
                        existingInvoice.customerEmail = invoiceDetails.customerEmail;
                    }
                    if (invoiceDetails.amount != null) {
                        existingInvoice.amount = invoiceDetails.amount;
                    }
                    if (invoiceDetails.invoiceDate != null) {
                        existingInvoice.invoiceDate = invoiceDetails.invoiceDate;
                    }
                    if (invoiceDetails.dueDate != null) {
                        existingInvoice.dueDate = invoiceDetails.dueDate;
                    }
                    if (invoiceDetails.description != null) {
                        existingInvoice.description = invoiceDetails.description;
                    }
                    existingInvoice.paid = invoiceDetails.paid;
                    
                    return invoiceRepository.save(existingInvoice);
                });
    }
    
    public boolean deleteInvoice(Long id) {
        if (invoiceRepository.existsById(id)) {
            invoiceRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Invoice> getInvoicesByCustomerName(String customerName) {
        return invoiceRepository.findByCustomerName(customerName);
    }
    
    public List<Invoice> getInvoicesByDateRange(LocalDate startDate, LocalDate endDate) {
        return invoiceRepository.findByInvoiceDateBetween(startDate, endDate);
    }
    
    public List<Invoice> getInvoicesByPaymentStatus(boolean paid) {
        return invoiceRepository.findByPaid(paid);
    }
}
