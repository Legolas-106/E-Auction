package com.auction.z_backend.auction.dto.response.ListedAuction;

import java.util.List;

import com.auction.z_backend.auction.model.ListedAuction;
import com.auction.z_backend.vendor.model.ItemDetailTable;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@RequiredArgsConstructor
public class GetVendorListedAuctionResponse {
    private String errorCode = "1";
    private String message;
    private List<ListedAuction> listedAuction;
    private List<ItemDetailTable> itemDetails;
}
