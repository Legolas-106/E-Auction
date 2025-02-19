package com.auction.z_backend.auction.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "EndedAuction")
public class AuctionEnded {
    @Id
    private Long id;
    private Long itemId;
    private Long vendorUserId;
    private Long upcomingAuctionId;
    private Long ongoingAuctionId;
    private Long winnerBidderUserId;
    private Long winningBidId;
    private LocalDateTime winningTime;
    private Boolean winningPaymentDone;
    private Long paymentId;
    private Boolean documentVerified;
    private Long verifiedDocumentTableId;
}
