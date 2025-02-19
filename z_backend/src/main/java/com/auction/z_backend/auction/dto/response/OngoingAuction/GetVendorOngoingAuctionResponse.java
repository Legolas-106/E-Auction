package com.auction.z_backend.auction.dto.response.OngoingAuction;

import java.util.List;

import com.auction.z_backend.auction.model.OngoingAuction;
import com.auction.z_backend.vendor.model.ItemDetailTable;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@RequiredArgsConstructor
public class GetVendorOngoingAuctionResponse {
    private String errorCode = "1";
    private String message;
    private List<OngoingAuction> ongoingAuction;
    private List<ItemDetailTable> itemDetails;
}
