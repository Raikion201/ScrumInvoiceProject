package com.invoicebe.controller;

import com.invoicebe.entity.ContactForm;
import com.invoicebe.service.ContactFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.ConstraintViolationException;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactFormController {
    @Autowired
    private ContactFormService service;

    @PostMapping
    public ResponseEntity<?> submitContactForm(@RequestBody ContactForm contactForm) {
        try {
            ContactForm savedForm = service.saveContactForm(contactForm);
            return ResponseEntity.ok(savedForm);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.badRequest().body(e.getConstraintViolations());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while processing your request.");
        }
    }
}