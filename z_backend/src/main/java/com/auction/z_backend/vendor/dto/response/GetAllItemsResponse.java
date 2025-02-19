package com.auction.z_backend.vendor.dto.response;

import java.util.List;

import com.auction.z_backend.auction.dto.response.EndedAuction.GetVendorEndedAuctionResponse;
import com.auction.z_backend.auction.dto.response.ListedAuction.GetVendorListedAuctionResponse;
import com.auction.z_backend.auction.dto.response.OngoingAuction.GetVendorOngoingAuctionResponse;
import com.auction.z_backend.auction.dto.response.UpcomingAuction.GetVendorUpcomingAuctionResponse;
import com.auction.z_backend.vendor.model.ItemDetailTable;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Data
@Getter
@Setter
@RequiredArgsConstructor
public class GetAllItemsResponse {
    private String errorCode;
    private String message;
    private GetVendorUpcomingAuctionResponse upcomingAuction;
    private GetVendorListedAuctionResponse listedAuction;
    private GetVendorOngoingAuctionResponse ongoingAuction;
    private GetVendorEndedAuctionResponse endAuction;
    private List<ItemDetailTable> itemDetails;
}
