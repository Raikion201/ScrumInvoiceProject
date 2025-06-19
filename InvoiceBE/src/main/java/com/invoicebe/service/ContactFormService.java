package com.invoicebe.service;

import com.invoicebe.entity.ContactForm;
import com.invoicebe.repository.ContactFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import java.util.Set;

@Service
public class ContactFormService {
    @Autowired
    private ContactFormRepository repository;

    @Autowired
    private Validator validator;

    public ContactForm saveContactForm(ContactForm contactForm) {
        Set<ConstraintViolation<ContactForm>> violations = validator.validate(contactForm);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
        return repository.save(contactForm);
    }
}