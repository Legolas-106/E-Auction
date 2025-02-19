package com.auction.z_backend.auction.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auction.z_backend.auction.dto.response.UpcomingAuction.GetVendorUpcomingAuctionResponse;
import com.auction.z_backend.auction.service.UpcomingAuctionService;

@RestController
@RequestMapping("/api/auction-search")
@CrossOrigin(origins="https://0.0.0.0:3000")
public class SearchAuctionController {
    
    private final UpcomingAuctionService upcomingAuctionService;

    public SearchAuctionController(UpcomingAuctionService upcomingAuctionService){
        this.upcomingAuctionService = upcomingAuctionService;
    }

    @GetMapping("upcoming-auction")
    public ResponseEntity<?> searchUpcomingAuction(){

        return ResponseEntity.status(201).body("Hello");
    }

    @GetMapping("test")
    public ResponseEntity<?> test(){
        return ResponseEntity.status(200).body("Requeat reached");
    }

    @GetMapping("my-upcoming-auction")
    public ResponseEntity<?> vendorUpcomingAuction(@RequestParam String loginId){
        try {
            GetVendorUpcomingAuctionResponse upcomingAuctions = upcomingAuctionService.getVendorUpcomingAuction(loginId);

            if (upcomingAuctions.getErrorCode()!="0") {
                return ResponseEntity.noContent().build(); // 204 No Content for empty list
            } else {
                return ResponseEntity.ok(upcomingAuctions); // 200 OK with the list
            }

        } catch (Exception e) { // Catch potential exceptions
            System.err.println("Error fetching upcoming auctions: " + e.getMessage()); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }    
    }
}
