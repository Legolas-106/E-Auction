package com.auction.z_backend.common.dto.request;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionSearchCriteria {
    private String lotType;
    private String auctionId;
    private String auctionType;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDateTime fromDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDateTime toDate;

    private String auctionStatus;
}
