package com.auction.z_backend.auction.model;

import java.time.LocalDateTime;

import com.auction.z_backend.common.enums.AuctionStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="ListedAuction")
public class ListedAuction {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;


    private Long vendorId;
    private Long upcomingAuctionId;
    private Long itemId;
    private String auctionTitle;
    private String auctionDescription;
    private String auctionType;
    private String auctionLotType;
    private LocalDateTime auctionStartDate;
    private LocalDateTime auctionPublishDate;
    private LocalDateTime auctionEndDate;
    private LocalDateTime auctionBidderRegistrationStartDate;
    private LocalDateTime auctionBidderRegistrationEndDate;
    private LocalDateTime auctionMinimumBidIncrement;
    private String auctionFee;
    private AuctionStatus status;

}
