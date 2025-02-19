package com.auction.z_backend.auction.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.auction.z_backend.auction.dto.response.ListedAuction.GetVendorListedAuctionResponse;
import com.auction.z_backend.auction.model.ListedAuction;
import com.auction.z_backend.auction.repository.ListedAuctionRepository;
import com.auction.z_backend.vendor.model.ItemDetailTable;
import com.auction.z_backend.vendor.repository.VendorItemRepository;

@Service
public class ListedAuctionService {
    private final ListedAuctionRepository listedAuctionRepository;
    private final VendorItemRepository vendorItemRepository;

    public ListedAuctionService(ListedAuctionRepository listedAuctionRepository
    ,VendorItemRepository vendorItemRepository){
        this.listedAuctionRepository = listedAuctionRepository;
        this.vendorItemRepository = vendorItemRepository;
    }

    public GetVendorListedAuctionResponse getVendorAuctions(String loginId,Long vendorId){
        System.out.println("Login ID is : "+loginId+" User ID: "+String.valueOf(vendorId));
        GetVendorListedAuctionResponse res = new GetVendorListedAuctionResponse();
        if(vendorId!=null){
            List<ListedAuction> listedAuctions = listedAuctionRepository.findByVendorId(vendorId);
            if(listedAuctions != null){
                List<ItemDetailTable> itemDetails = new ArrayList<>();
                for(ListedAuction auctions : listedAuctions){
                    Long itemId = auctions.getItemId();
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
                res.setListedAuction(listedAuctions);
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
