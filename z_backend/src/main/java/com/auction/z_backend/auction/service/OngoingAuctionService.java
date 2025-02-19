package com.auction.z_backend.auction.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.auction.z_backend.auction.dto.response.OngoingAuction.GetVendorOngoingAuctionResponse;
import com.auction.z_backend.auction.model.OngoingAuction;
import com.auction.z_backend.auction.repository.OngoingAuctionRepository;
import com.auction.z_backend.vendor.model.ItemDetailTable;
import com.auction.z_backend.vendor.repository.VendorItemRepository;

@Service
public class OngoingAuctionService {
    private final OngoingAuctionRepository ongoingAuctionRepository;
    private final VendorItemRepository vendorItemRepository;

    public OngoingAuctionService(OngoingAuctionRepository ongoingAuctionRepository,VendorItemRepository vendorItemRepository){
        this.ongoingAuctionRepository = ongoingAuctionRepository;
        this.vendorItemRepository = vendorItemRepository;
    }

    public GetVendorOngoingAuctionResponse getVendorAuctions(String loginId,Long vendorId){

        GetVendorOngoingAuctionResponse res = new GetVendorOngoingAuctionResponse();

        if(vendorId!=null){
            List<OngoingAuction> ongoingAuctions = ongoingAuctionRepository.findByVendorId(vendorId);
            if(ongoingAuctions!=null){
                System.out.print(ongoingAuctions);
                List<ItemDetailTable> itemDetails = new ArrayList<>();

                for(OngoingAuction auctionDetail : ongoingAuctions){
                    Long itemId = auctionDetail.getItemId();
                    if(itemId != null){
                        Optional<ItemDetailTable> opt_item = vendorItemRepository.findById(itemId);
                        if(opt_item.isPresent()){
                            ItemDetailTable item = opt_item.get();
                            itemDetails.add(item);
                        }
                    }
                }
                res.setErrorCode(loginId);
                res.setMessage("Details Fetched Successfully");
                res.setOngoingAuction(ongoingAuctions);
                res.setItemDetails(itemDetails);
                return res;
            }
            return res;
        }
        return res;
    }
}
