package com.auction.z_backend.vendor.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ItemLotDetailDTO {
    private String auctionLotNumber;
    private String productCategory;
    private String lotWeight;
    private String lotDescription;
    private String lotAddress;
    private String lotCity;
    private String lotState;
    private String lotPostalCode;
    private String lotSellerContactNumber;
    private String lotEMD;
    private String lotAuctionAmount;

}
