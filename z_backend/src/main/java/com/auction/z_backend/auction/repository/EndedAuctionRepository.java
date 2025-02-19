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

@Repository
public interface EndedAuctionRepository extends JpaRepository<AuctionEnded, String> {
    List<AuctionEnded> findByVendorUserId(Long id);
    Boolean existsByVendorUserId(Long id);
    Optional<AuctionEnded> findById(Long id);
    
@Query("SELECT w FROM AuctionEnded w WHERE " +
       "(:id IS NULL OR w.id = :id) AND " +
       "(:itemId IS NULL OR w.itemId = :itemId) AND " +
       "(:vendorUserId IS NULL OR w.vendorUserId = :vendorUserId) AND " +
       "(:winnerBidderUserId IS NULL OR w.winnerBidderUserId = :winnerBidderUserId) AND " +
       "(:winningBidId IS NULL OR w.winningBidId = :winningBidId) AND " +
       "(:winningTime IS NULL OR w.winningTime >= :winningTime) AND " +
       "(:winningPaymentDone IS NULL OR w.winningPaymentDone = :winningPaymentDone) AND " +
       "(:paymentId IS NULL OR w.paymentId = :paymentId) AND " +
       "(:documentVerified IS NULL OR w.documentVerified = :documentVerified) AND " +
       "(:verifiedDocumentTableId IS NULL OR w.verifiedDocumentTableId = :verifiedDocumentTableId)")
List<AuctionEnded> searchAuctions(
       @Param("id") Long id,
       @Param("itemId") Long itemId,
       @Param("vendorUserId") Long vendorUserId,
       @Param("winnerBidderUserId") Long winnerBidderUserId,
       @Param("winningBidId") Long winningBidId,
       @Param("winningTime") LocalDateTime winningTime,
       @Param("winningPaymentDone") Boolean winningPaymentDone,
       @Param("paymentId") Long paymentId,
       @Param("documentVerified") Boolean documentVerified,
       @Param("verifiedDocumentTableId") Long verifiedDocumentTableId);

}
