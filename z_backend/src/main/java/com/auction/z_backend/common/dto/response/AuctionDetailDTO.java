package com.auction.z_backend.common.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuctionDetailDTO {
    private String lotType;
    private String auctionId;
    private String auctionType;
    private String productCategory;
    private String auctionDescription;
    private String auctionTitle;
    private String auctionStatus;
    private String auctionStartDate;
    private String auctionEndDate;
    private String auctionPublishDate;
    private List<AuctionItemDetailsDTO> itemDetails;
}
