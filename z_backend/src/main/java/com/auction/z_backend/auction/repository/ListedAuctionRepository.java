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
import com.auction.z_backend.auction.model.ListedAuction;
import com.auction.z_backend.auction.model.UpcomingAuction;
import com.auction.z_backend.common.enums.AuctionStatus;

@Repository
public interface ListedAuctionRepository extends JpaRepository<ListedAuction, String> {

    List<ListedAuction> findByVendorId(Long id);
    Boolean existsByVendorId(Long id);
    Optional<ListedAuction> findById(Long id);

    @Query("SELECT a FROM ListedAuction a WHERE " +
        "(:id IS NULL OR a.id = :id) AND " +
        "(:vendorId IS NULL OR a.vendorId = :vendorId) AND " +
    "(:upcomingAuctionId IS NULL OR a.upcomingAuctionId = :upcomingAuctionId) AND " +
    "(:itemId IS NULL OR a.itemId = :itemId) AND " +
    "(:auctionTitle IS NULL OR a.auctionTitle LIKE %:auctionTitle%) AND " +
    "(:auctionDescription IS NULL OR a.auctionDescription LIKE %:auctionDescription%) AND " +
    "(:auctionType IS NULL OR a.auctionType = :auctionType) AND " +
    "(:auctionLotType IS NULL OR a.auctionLotType = :auctionLotType) AND " +
    "(:auctionStartDate IS NULL OR a.auctionStartDate >= :auctionStartDate) AND " +
    "(:auctionPublishDate IS NULL OR a.auctionPublishDate <= :auctionPublishDate) AND " +
    "(:auctionEndDate IS NULL OR a.auctionEndDate <= :auctionEndDate) AND " +
    "(:auctionBidderRegistrationStartDate IS NULL OR a.auctionBidderRegistrationStartDate >= :auctionBidderRegistrationStartDate) AND " +
    "(:auctionBidderRegistrationEndDate IS NULL OR a.auctionBidderRegistrationEndDate <= :auctionBidderRegistrationEndDate) AND " +
    "(:auctionMinimumBidIncrement IS NULL OR a.auctionMinimumBidIncrement >= :auctionMinimumBidIncrement) AND " +
    "(:auctionFee IS NULL OR a.auctionFee = :auctionFee) AND " +
    "(:status IS NULL OR a.status = :status)")
List<ListedAuction> searchAuctions(
    @Param("id") Long id,
    @Param("vendorId") Long vendorId,
    @Param("upcomingAuctionId") Long upcomingAuctionId,
    @Param("itemId") Long itemId,
    @Param("auctionTitle") String auctionTitle,
    @Param("auctionDescription") String auctionDescription,
    @Param("auctionType") String auctionType,
    @Param("auctionLotType") String auctionLotType,
    @Param("auctionStartDate") LocalDateTime auctionStartDate,
    @Param("auctionPublishDate") LocalDateTime auctionPublishDate,
    @Param("auctionEndDate") LocalDateTime auctionEndDate,
    @Param("auctionBidderRegistrationStartDate") LocalDateTime auctionBidderRegistrationStartDate,
    @Param("auctionBidderRegistrationEndDate") LocalDateTime auctionBidderRegistrationEndDate,
    @Param("auctionMinimumBidIncrement") LocalDateTime auctionMinimumBidIncrement,
    @Param("auctionFee") String auctionFee,
    @Param("status") AuctionStatus status);


}
