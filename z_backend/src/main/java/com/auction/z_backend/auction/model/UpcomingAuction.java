package com.auction.z_backend.auction.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "UpcomingAuction")
public class UpcomingAuction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String auctionType;

    @Column(nullable = false, length = 255)
    private String auctionTitle;

    @Column(columnDefinition = "TEXT")
    private String auctionDescription;

    private String product;

    @Column(nullable = false)
    private String auctionLotType;

    @Column
    private int minBidderRequired;

    @Column(nullable = false)
    private LocalDateTime auctionStartDate;

    @Column(nullable=false)
    private LocalDateTime auctionEndDate;

    @Column(nullable = false)
    private LocalDateTime auctionPublishDate;

    @Column(nullable = false)
    private LocalDateTime auctionBidderRegistrationStartDate;

    @Column(nullable = false)
    private LocalDateTime auctionBidderRegistrationEndDate;

    @Column(nullable = false)
    private Long vendorId;

    @Column(nullable = false)
    private Long itemId;

}
