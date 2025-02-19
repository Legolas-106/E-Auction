package com.auction.z_backend.auction.dto.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUpcomingAuctionDTO {

    private String auctionType;
    private String auctionTitle;
    private String auctionDescription;
    private String auctionLotType;
    private int minBidderRequired;
    private LocalDateTime auctionStartDate;
    private LocalDateTime auctionEndDate;
    private LocalDateTime auctionPublishDate;
    private LocalDateTime auctionBidderRegistrationStartDate;
    private LocalDateTime auctionBidderRegistrationEndDate;
    private Long vendorId;
    private Long itemId;
    private LocalDateTime creationTime;

}
