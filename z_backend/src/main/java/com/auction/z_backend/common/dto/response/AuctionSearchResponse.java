package com.auction.z_backend.common.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
public class AuctionSearchResponse {
    private Integer totalAuctions;
    private LocalDateTime searchTime;
    private List<AuctionDetailDTO> auctionDetails;
}
