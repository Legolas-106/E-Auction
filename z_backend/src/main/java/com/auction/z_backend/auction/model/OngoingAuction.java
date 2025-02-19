package com.auction.z_backend.auction.model;

import com.auction.z_backend.common.enums.AuctionStatus;

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
@Table(name = "OngoingAuction")
public class OngoingAuction {

    @Id
    private Long id;
    
    private Long listedAuctionId;
    private Long itemId;
    private Long vendorId;
    private Long registeredBidderTableId;
    private String auctionTitle;
    private String auctionDescription;
    private String auctionType;
    private String auctionLotType;
    private Long currentHighestBidId;
    private Long upcomingAuctionId;
    private AuctionStatus status;
}
