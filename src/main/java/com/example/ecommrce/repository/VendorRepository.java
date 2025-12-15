package com.example.ecommrce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.ecommrce.entity.Vendor;
@Repository
public interface VendorRepository extends JpaRepository<Vendor,Long> {
	Vendor getVendorByUserId(Long userId);


}
