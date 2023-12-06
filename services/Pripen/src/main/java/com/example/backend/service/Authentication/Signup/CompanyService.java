package com.example.backend.service.Authentication.Signup;

import com.example.backend.model.Authentication.Company;
import com.example.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

    @Service
    public class CompanyService {

        private final CompanyRepository companyRepository;

        @Autowired
        public CompanyService(CompanyRepository companyRepository) {
            this.companyRepository = companyRepository;
        }

        public List<Company> searchCompanies(String query) {
            // 데이터베이스에서 회사명이 쿼리를 포함하는 회사들을 검색
            return companyRepository.findByCompanyNameContaining(query);
        }
        public Company createCompany(Company newCompany) {
            // 새로운 회사 정보를 데이터베이스에 저장
            return companyRepository.save(newCompany);
        }
    }
