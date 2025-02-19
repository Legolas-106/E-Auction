package com.auction.z_backend.vendor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auction.z_backend.vendor.model.ItemDetailTable;

@Repository
public interface  VendorItemRepository extends JpaRepository<ItemDetailTable, String> { 
    Optional<ItemDetailTable> findById(Long id);
    List<ItemDetailTable> findByLoginId(String loginID);
    List<ItemDetailTable> findByLoginIdAndAuctionActiveNullAndAuctionEndedNull(String loginId);
    Boolean existsByLoginId(String loginId);
}
