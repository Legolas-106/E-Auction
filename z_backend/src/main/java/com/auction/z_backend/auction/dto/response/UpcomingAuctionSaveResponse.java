package com.auction.z_backend.auction.dto.response;

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
public class UpcomingAuctionSaveResponse {
    private Long id;
    private String errorCode;
    private String message;
}
