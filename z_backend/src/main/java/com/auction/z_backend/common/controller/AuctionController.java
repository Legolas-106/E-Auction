package com.auction.z_backend.common.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Stack;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auction.z_backend.common.dto.request.AuctionSearchCriteria;
import com.auction.z_backend.common.dto.response.AuctionSearchResponse;
import com.auction.z_backend.common.service.CommonAuctionService;

@RestController
@RequestMapping("/api/searchAuction/")
public class AuctionController {
    
    private final CommonAuctionService commonAuctionService;

    public AuctionController(CommonAuctionService commonAuctionService){
        this.commonAuctionService = commonAuctionService;
    }

    @GetMapping("")
    public ResponseEntity<?> searchAuctions(
            @RequestParam(required = false) String lotType,
            @RequestParam(required = false) String auctionId,
            @RequestParam(required = false) String auctionType,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime toDate,
            @RequestParam(required = false) String auctionStatus) {

        // Create a filter object
        System.out.println("Request Reached");
        // return ResponseEntity.status(200).body("Request reached");
        AuctionSearchCriteria criteria = new AuctionSearchCriteria(lotType,auctionId,auctionType,fromDate,toDate,auctionStatus);

        // Fetch results based on search criteria
        AuctionSearchResponse results = commonAuctionService.searchAuctions(criteria);

        return ResponseEntity.ok(results);
    }
}
