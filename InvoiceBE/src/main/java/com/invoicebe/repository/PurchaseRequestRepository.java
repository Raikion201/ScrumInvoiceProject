package com.invoicebe.repository;

import com.invoicebe.model.PurchaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Long> {
    // This interface automatically provides basic CRUD operations:
    // save(), findById(), findAll(), deleteById(), etc.
}