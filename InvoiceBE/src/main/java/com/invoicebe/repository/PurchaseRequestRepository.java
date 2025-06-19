package com.invoicebe.repository;

import com.invoicebe.model.PurchaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Long> {

    @Query("SELECT pr FROM PurchaseRequest pr WHERE (:status IS NULL OR pr.status = :status) " +
           "AND (:startDueDate IS NULL OR pr.dueDate >= :startDueDate) " +
           "AND (:endDueDate IS NULL OR pr.dueDate <= :endDueDate) " +
           "AND (:isPaid IS NULL OR pr.isPaid = :isPaid)")
    List<PurchaseRequest> findByFilters(
        @Param("status") String status,
        @Param("startDueDate") LocalDate startDueDate,
        @Param("endDueDate") LocalDate endDueDate,
        @Param("isPaid") Boolean isPaid
    );
}
