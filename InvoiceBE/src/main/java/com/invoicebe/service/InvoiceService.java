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

    public Optional<Invoice> updateInvoice(Long id, Invoice updatedInvoice) {
        return invoiceRepository.findById(id).map(existingInvoice -> {
            existingInvoice.setInvoiceNumber(updatedInvoice.getInvoiceNumber());
            existingInvoice.setCustomerName(updatedInvoice.getCustomerName());
            existingInvoice.setCustomerEmail(updatedInvoice.getCustomerEmail());
            existingInvoice.setAmount(updatedInvoice.getAmount());
            existingInvoice.setInvoiceDate(updatedInvoice.getInvoiceDate());
            existingInvoice.setDueDate(updatedInvoice.getDueDate());
            existingInvoice.setDescription(updatedInvoice.getDescription());
            existingInvoice.setPaid(updatedInvoice.getPaid());
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
