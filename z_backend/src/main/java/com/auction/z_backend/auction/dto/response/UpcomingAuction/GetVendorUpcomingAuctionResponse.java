package com.auction.z_backend.auction.dto.response.UpcomingAuction;

import java.util.List;

import com.auction.z_backend.auction.model.UpcomingAuction;
import com.auction.z_backend.vendor.model.ItemDetailTable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class GetVendorUpcomingAuctionResponse {
    private String errorCode = "1";
    private String message;
    private List<UpcomingAuction> upcomingAuction;
    private List<ItemDetailTable> itemDetails;

}
