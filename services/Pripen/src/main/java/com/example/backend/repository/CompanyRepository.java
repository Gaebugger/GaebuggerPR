package com.example.backend.repository;

import com.example.backend.model.Authentication.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findByCompanyNameContaining(String query);
}
