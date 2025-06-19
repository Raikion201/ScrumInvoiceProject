package com.invoicebe.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invoicebe.model.Bill;
import com.invoicebe.repository.BillRepository;

@Service
public class BillService {
    @Autowired
    private BillRepository repository;

    public List<Bill> getAllBills() {
        return repository.findAll();
    }

    public Optional<Bill> getBillByPurchaseRequestId(Long purchaseRequestId) {
        return repository.findByPurchaseRequestId(purchaseRequestId);
    }
    
    public Optional<Bill> markBillAsPaid(Long id) {
        Optional<Bill> billOpt = repository.findById(id);
        if (billOpt.isPresent()) {
            Bill bill = billOpt.get();
            bill.setStatus(Bill.Status.PAID);
            return Optional.of(repository.save(bill));
        }
        return Optional.empty();
    }
}