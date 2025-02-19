package com.auction.z_backend.auction.dto.response.EndedAuction;

import java.util.List;

import com.auction.z_backend.auction.model.AuctionEnded;
import com.auction.z_backend.vendor.model.ItemDetailTable;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@RequiredArgsConstructor
public class GetVendorEndedAuctionResponse {
    private String errorCode = "1";
    private String message;
    private List<AuctionEnded> endAuction;
    private List<ItemDetailTable> itemDetails;
}
