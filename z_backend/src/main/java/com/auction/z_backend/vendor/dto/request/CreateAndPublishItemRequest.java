package com.auction.z_backend.vendor.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class CreateAndPublishItemRequest {

    private String username;
    private String loginId;
    private String companyName;
    private String auctionType;
    private String auctionTitle;
    private String auctionDescription;
    private String auctionLotType;
    private List<ItemLotDetailDTO> auctionLotDetails;
    private String totalWeight;
    private LocalDateTime auctionStartDate;
    private LocalDateTime auctionEndDate;
    private LocalDateTime auctionPublishDate;
    private String minBidderRequired;


}
