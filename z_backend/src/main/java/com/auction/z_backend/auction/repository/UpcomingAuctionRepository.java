package com.auction.z_backend.auction.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.auction.z_backend.auction.model.AuctionEnded;
import com.auction.z_backend.auction.model.UpcomingAuction;

@Repository
public interface UpcomingAuctionRepository extends JpaRepository<UpcomingAuction, String> {
    Optional<UpcomingAuction> findById(Long id);
    Boolean existsById(Long id);
    List<UpcomingAuction> findByVendorId(Long vendorId);

    @Query("SELECT a FROM UpcomingAuction a WHERE " +
        "(:auctionLotType IS NULL OR a.auctionLotType = :auctionLotType) AND " +
        "(:id IS NULL OR a.id = :id) AND " +
        "(:auctionType IS NULL OR a.auctionType = :auctionType) AND " +
        "(:auctionStartDate IS NULL OR a.auctionStartDate >= :auctionStartDate) AND " +
        "(:auctionEndDate IS NULL OR a.auctionEndDate <= :auctionEndDate)")
    List<UpcomingAuction> searchAuctions(
            @Param("auctionLotType") String auctionLotType,
            @Param("id") Long id,
            @Param("auctionType") String auctionType,
            @Param("auctionStartDate") LocalDateTime auctionStartDate,
            @Param("auctionEndDate") LocalDateTime auctionEndDate);

}
