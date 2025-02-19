package com.auction.z_backend.auction.dto;

import java.time.LocalDateTime;
import java.util.List;

public class NormalAuctionDetails {
    private String auctionDescription;
    private String lotType;
    private String auctionTitle;
    private String auctionType;
    private List<NormalLotDetails> lotDetails;
    private LocalDateTime auctionStartDate;
    private LocalDateTime auctionEndDate;
    private LocalDateTime auctionPublishDate;
    private String auctionStatus;
}
