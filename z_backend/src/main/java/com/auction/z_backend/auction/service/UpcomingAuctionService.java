package com.auction.z_backend.auction.service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.auction.z_backend.auction.dto.request.CreateUpcomingAuctionDTO;
import com.auction.z_backend.auction.dto.response.UpcomingAuction.GetVendorUpcomingAuctionResponse;
import com.auction.z_backend.auction.dto.response.UpcomingAuctionSaveResponse;
import com.auction.z_backend.auction.model.UpcomingAuction;
import com.auction.z_backend.auction.repository.UpcomingAuctionRepository;
import com.auction.z_backend.vendor.model.ItemDetailTable;
import com.auction.z_backend.vendor.model.UserVendor;
import com.auction.z_backend.vendor.repository.VendorItemRepository;
import com.auction.z_backend.vendor.repository.VendorUserRepository;

@Service
public class UpcomingAuctionService {

    //Inintialize the Upcoming Auction Repository
        private final UpcomingAuctionRepository upcomingAuctionRepository;
        private final VendorUserRepository vendorUserRepository;
        private final VendorItemRepository vendorItemRepository;

        public UpcomingAuctionService(UpcomingAuctionRepository upcomingAuctionRepository, VendorUserRepository vendorUserRepository
        , VendorItemRepository vendorItemRepository){
            this.upcomingAuctionRepository = upcomingAuctionRepository;
            this.vendorUserRepository = vendorUserRepository;
            this.vendorItemRepository = vendorItemRepository;
        }

        
        public UpcomingAuctionSaveResponse createUpcomingAuction(CreateUpcomingAuctionDTO request){
            System.out.println("Inside creating the upcoming auction");
            
            if(request.getItemId() ==null || request.getVendorId() == null){
                System.out.println(request.getItemId()+request.getVendorId());
                System.err.println("ItemId or Vendor ID is nota available");
                UpcomingAuctionSaveResponse err_res = new UpcomingAuctionSaveResponse();
                err_res.setErrorCode("-1");
                err_res.setId(null);
                err_res.setMessage("Bad Request : User or Vendor ID is not available");
                return err_res;
            }

            UpcomingAuction auc = new UpcomingAuction();
            System.out.println("Upcoming AuctionObject Createe");

            auc.setAuctionType(request.getAuctionType());
            auc.setAuctionDescription(request.getAuctionDescription());
            auc.setAuctionTitle(request.getAuctionTitle());
            auc.setAuctionLotType(request.getAuctionLotType());
            auc.setMinBidderRequired(request.getMinBidderRequired());
            auc.setAuctionStartDate(request.getAuctionStartDate());
            auc.setAuctionEndDate(request.getAuctionEndDate());
            auc.setAuctionPublishDate(request.getAuctionPublishDate());
            auc.setAuctionBidderRegistrationStartDate(request.getAuctionPublishDate());
            auc.setAuctionBidderRegistrationEndDate(request.getAuctionStartDate().minus(5,ChronoUnit.MINUTES));
            // Check current user_id is the id we got
            System.out.println("Data is saved in the object");
            System.out.println(request.getItemId());
            System.out.println(request.getVendorId());


            auc.setItemId(request.getItemId());
            auc.setVendorId(request.getVendorId());
            System.out.println("Now Setting up the id");
            System.out.println(request.getAuctionStartDate());
            System.out.println(request.getAuctionPublishDate());
            System.out.println(request.getAuctionEndDate());

            
            UpcomingAuction savedAuction = upcomingAuctionRepository.save(auc);
            System.out.println("savedIem Id"+savedAuction.getId());
            System.out.println("Upcoming Auction is created now, saving the item images to auction directory");

            

            UpcomingAuctionSaveResponse res = new UpcomingAuctionSaveResponse(
                savedAuction.getId(),
                "0",
                "Item Created SuccessFully"
            );
            System.out.print("Auction Details are saved");

            return res;

            
        }

        public GetVendorUpcomingAuctionResponse getVendorUpcomingAuction(String loginId){
            
            System.err.println("Request reached till service layer");
            System.err.println(loginId);
            
            System.err.println("Getting User ID");
            Optional<UserVendor> user = vendorUserRepository.findByLoginId(loginId);

            if(user.isEmpty()){
                System.err.println("User is Empty");
                throw new RuntimeException("User Not found in the repo");
            }

            Long userId = user.map(UserVendor :: getId).orElse(null);

            List<UpcomingAuction> response = upcomingAuctionRepository.findByVendorId(userId);
            System.out.println(response);
            List<ItemDetailTable> itemDetails = new ArrayList<>();

            for(UpcomingAuction item :response){
                Long id = item.getItemId();
                if(id!=null){
                    Optional<ItemDetailTable> itemDetailTable = vendorItemRepository.findById(id);
                    if(itemDetailTable.isPresent()){
                        System.out.println("Items Is found for ID : "+String.valueOf(id));
                        ItemDetailTable curr_item = itemDetailTable.get();
                        itemDetails.add(curr_item);
                    }
                }
            }

            GetVendorUpcomingAuctionResponse res = new GetVendorUpcomingAuctionResponse();
            res.setErrorCode("0");
            res.setMessage("Details fetched successfully");
            res.setUpcomingAuction(response);
            res.setItemDetails(itemDetails);

            System.out.println(res);

            if(res == null){
                System.out.println("No Items are found for the given user id");
                throw new RuntimeException("No data found for the given user id");
            }
            return res;
        }
}
