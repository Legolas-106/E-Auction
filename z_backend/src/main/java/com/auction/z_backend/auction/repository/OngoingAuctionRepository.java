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
import com.auction.z_backend.auction.model.OngoingAuction;
import com.auction.z_backend.auction.model.UpcomingAuction;
import com.auction.z_backend.common.enums.AuctionStatus;

@Repository
public interface OngoingAuctionRepository extends JpaRepository<OngoingAuction, String> {
    List<OngoingAuction> findByVendorId(Long id);
    Boolean existsByVendorId(Long id);
    Optional<OngoingAuction> findById(Long id);

@Query("SELECT a FROM OngoingAuction a WHERE " +
        "(:id IS NULL OR a.id = :id) AND " +
        "(:listedAuctionId IS NULL OR a.listedAuctionId = :listedAuctionId) AND " +
       "(:itemId IS NULL OR a.itemId = :itemId) AND " +
       "(:vendorId IS NULL OR a.vendorId = :vendorId) AND " +
       "(:registeredBidderTableId IS NULL OR a.registeredBidderTableId = :registeredBidderTableId) AND " +
       "(:auctionTitle IS NULL OR a.auctionTitle LIKE %:auctionTitle%) AND " +
       "(:auctionDescription IS NULL OR a.auctionDescription LIKE %:auctionDescription%) AND " +
       "(:auctionType IS NULL OR a.auctionType = :auctionType) AND " +
       "(:auctionLotType IS NULL OR a.auctionLotType = :auctionLotType) AND " +
       "(:currentHighestBidId IS NULL OR a.currentHighestBidId = :currentHighestBidId)")
List<OngoingAuction> searchAuctions(
        @Param("id") Long id,
       @Param("listedAuctionId") Long listedAuctionId,
       @Param("itemId") Long itemId,
       @Param("vendorId") Long vendorId,
       @Param("registeredBidderTableId") Long registeredBidderTableId,
       @Param("auctionTitle") String auctionTitle,
       @Param("auctionDescription") String auctionDescription,
       @Param("auctionType") String auctionType,
       @Param("auctionLotType") String auctionLotType,
       @Param("currentHighestBidId") Long currentHighestBidId);

}
