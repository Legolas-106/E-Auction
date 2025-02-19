package com.auction.z_backend.auction.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.auction.z_backend.auction.dto.response.EndedAuction.GetVendorEndedAuctionResponse;
import com.auction.z_backend.auction.model.AuctionEnded;
import com.auction.z_backend.auction.repository.EndedAuctionRepository;
import com.auction.z_backend.vendor.model.ItemDetailTable;
import com.auction.z_backend.vendor.repository.VendorItemRepository;

@Service
public class EndedAuctionService {
    private String loginId;
    
    private final EndedAuctionRepository endedAuctionRepository;
    private final VendorItemRepository vendorItemRepository;

    public EndedAuctionService(EndedAuctionRepository endedAuctionRepository,VendorItemRepository vendorItemRepository){
        this.endedAuctionRepository = endedAuctionRepository;
        this.vendorItemRepository = vendorItemRepository;
    }
    
    public GetVendorEndedAuctionResponse getVendorAuctions(String loginId, Long id){
        
        System.err.println("INside get vendor Ended auctions");
        System.out.println("Login Id is : "+loginId+" USer id is : "+String.valueOf(id));
        GetVendorEndedAuctionResponse res = new GetVendorEndedAuctionResponse();
        if(id != 0 || id != null){
            List<AuctionEnded> endedAuction = endedAuctionRepository.findByVendorUserId(id);
            System.out.println(endedAuction);
            if(endedAuction != null){
                List<ItemDetailTable> itemDetails = new ArrayList<>();
                for(AuctionEnded auction : endedAuction){
                    Long itemId = auction.getId();
                    if(itemId != null){
                        Optional<ItemDetailTable> opt_item = vendorItemRepository.findById(itemId);
                        if(opt_item.isPresent()){
                            ItemDetailTable item = opt_item.get();
                            itemDetails.add(item);
                        }
                    }
                }
                res.setErrorCode("0");
                res.setMessage("Details Fetched Successfully");
                res.setEndAuction(endedAuction);
                res.setItemDetails(itemDetails);
                return res;
            }
            else{
                return res;
            }
        }
        return res;
    }
}
