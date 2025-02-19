package com.auction.z_backend.vendor.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.auction.z_backend.auction.dto.request.CreateUpcomingAuctionDTO;
import com.auction.z_backend.auction.dto.response.ListedAuction.GetVendorListedAuctionResponse;
import com.auction.z_backend.auction.dto.response.OngoingAuction.GetVendorOngoingAuctionResponse;
import com.auction.z_backend.auction.dto.response.UpcomingAuction.GetVendorUpcomingAuctionResponse;
import com.auction.z_backend.auction.dto.response.UpcomingAuctionSaveResponse;
import com.auction.z_backend.auction.dto.response.EndedAuction.GetVendorEndedAuctionResponse;
import com.auction.z_backend.auction.model.AuctionEnded;
import com.auction.z_backend.auction.model.ListedAuction;
import com.auction.z_backend.auction.model.OngoingAuction;
import com.auction.z_backend.auction.model.UpcomingAuction;
import com.auction.z_backend.auction.service.EndedAuctionService;
import com.auction.z_backend.auction.service.ListedAuctionService;
import com.auction.z_backend.auction.service.OngoingAuctionService;
import com.auction.z_backend.auction.service.UpcomingAuctionService;
import com.auction.z_backend.auth.model.CustomUserDetails;
import com.auction.z_backend.service.ImageService;
import com.auction.z_backend.vendor.dto.request.CreateAndPublishItemRequest;
import com.auction.z_backend.vendor.dto.request.CreateItemRequest;
import com.auction.z_backend.vendor.dto.request.ItemLotDetailDTO;
import com.auction.z_backend.vendor.dto.response.CreateItemResponse;
import com.auction.z_backend.vendor.dto.response.GetAllItemsResponse;
import com.auction.z_backend.vendor.model.ItemDetailTable;
import com.auction.z_backend.vendor.model.ItemLotDetailTable;
import com.auction.z_backend.vendor.model.LotsImageTable;
import com.auction.z_backend.vendor.model.UserVendor;
import com.auction.z_backend.vendor.repository.VendorItemRepository;
import com.auction.z_backend.vendor.repository.VendorUserRepository;

import jakarta.transaction.Transactional;


@Service
public class VendorItemService {

    private final UpcomingAuctionService upcomingAuctionService; 
    private final ListedAuctionService listedAuctionService;
    private final OngoingAuctionService ongoingAuctionService;
    private final EndedAuctionService endedAuctionService;
    private final VendorItemRepository vendorItemRepository;
    
    private final VendorUserRepository vendorUserRepository;

    private final ImageService imgService;
    
    @Autowired
    public VendorItemService(VendorItemRepository vendorItemRepository,VendorUserRepository vendorUserRepository
    , ImageService imgService, UpcomingAuctionService upcomingAuctionService
    , ListedAuctionService listedAuctionService, OngoingAuctionService ongoingAuctionService
    , EndedAuctionService endedAuctionService){
        this.vendorItemRepository = vendorItemRepository;
        this.vendorUserRepository = vendorUserRepository;
        this.imgService = imgService;
        this.upcomingAuctionService = upcomingAuctionService;
        this.ongoingAuctionService = ongoingAuctionService;
        this.listedAuctionService = listedAuctionService;
        this.endedAuctionService = endedAuctionService;
    }
    
    @Transactional
    public CreateItemResponse creatVendorItem(CreateItemRequest request, Map<String,List<MultipartFile> > images){
        System.out.println("Hello Inside the service to create item for the vendor");
        
        if(request.getLoginId() == null){
            return new CreateItemResponse("-1","None","No UserId found for this request");
        }
        System.err.println("HHHHH----000-----HHHHH");
        Optional<UserVendor> user = vendorUserRepository.findByLoginId(request.getLoginId());
        System.out.println(user);
        if(user.isEmpty()){
            return new CreateItemResponse("-1",request.getLoginId(),"No UserId found for this request");
        }
        System.err.println("HHHHH----111-----HHHHH");

        ItemDetailTable itemTable = new ItemDetailTable();
        itemTable.setLoginId(request.getLoginId());
        itemTable.setCompanyName(request.getCompanyName());
        itemTable.setAuctionType(request.getAuctionType());
        itemTable.setAuctionTitle(request.getAuctionTitle());
        itemTable.setAuctionDescription(request.getAuctionDescription());
        itemTable.setAuctionLotType(request.getAuctionLotType());
        itemTable.setCreatedAt(LocalDateTime.now());
        itemTable.setAuctionActive(false);
        itemTable.setAuctionEnded(false);
        // itemTable.setTotalWeight(request.getTotalWeight());
        System.err.println("HHHHH----222-----HHHHH");

        List<ItemLotDetailTable> itemLotDetails = request.getAuctionLotDetails().stream().map(
            lotDetail -> {
                ItemLotDetailTable lot = new ItemLotDetailTable();
                lot.setAuctionLotNumber(lotDetail.getAuctionLotNumber());
                lot.setProductCategory(lotDetail.getProductCategory());
                lot.setLotWeight(lotDetail.getLotWeight());
                lot.setLotEMD(lotDetail.getLotEMD());
                lot.setLotAuctionAmount(lotDetail.getLotAuctionAmount());
                lot.setLotAddress(lotDetail.getLotAddress());
                lot.setLotCity(lotDetail.getLotCity());
                lot.setLotState(lotDetail.getLotState());
                lot.setLotPostalCode(lotDetail.getLotPostalCode());
                lot.setLotSellerContactNumber(lotDetail.getLotSellerContactNumber());
                lot.setLotDescription(lotDetail.getLotDescription());
                System.err.println("HHHHH----333-----HHHHH");

                // Crating an object to save the image table list
                List<LotsImageTable> lotImageTables = new ArrayList<>();
                for(Map.Entry<String, List<MultipartFile> > entry : images.entrySet()){
                    System.out.println("Lot Number: " + entry.getKey());
                    System.out.println("Value Class: " + entry.getValue().getClass());
                    for(MultipartFile file : entry.getValue()){
                        System.out.println("file : "+file.getOriginalFilename());
                    }
                }
                // Gettin images file for the respective lotNumber
                List<MultipartFile> files = images.get(lot.getAuctionLotNumber());
                if (files != null) { // Ensure there are files for this lot
                    for (MultipartFile img : files) {
                        LotsImageTable image = new LotsImageTable();
                        try {
                            // Setting the image values and adding it to list of lotTableImages
                            System.err.println("HHHHH----343-----HHHHH Image Id is : "+image.getId()+lot.getId());
                    
                            image.setUrl(imgService.saveImage(img, request.getLoginId(),itemTable.getCreatedAt(),lot.getAuctionLotNumber()));
                            image.setItemLotTable(lot);
                            System.err.println("HHHHH----444-----HHHHH");
                
                            lotImageTables.add(image);
                        } catch (Exception e) {
                            System.err.println("Exception while saving the image data to backend");
                            throw new RuntimeException("Error while saving the image data to backend: " + e.getMessage());
                        }
                    }
                }
                
                
                lot.setImages(lotImageTables);
                lot.setItemTable(itemTable);
                return lot;
            }).toList();
            
        System.err.println("HHHHH----555-----HHHHH");
        
        itemTable.setItemLotDetails(itemLotDetails);
        itemTable.setUser(user.orElse(null));
        
        ItemDetailTable savedItemDetail = vendorItemRepository.save(itemTable);
        
        System.out.println("Item Detail Table has been saved");

        //Handle logic to get the user detail from request.
        
                
        return new CreateItemResponse(savedItemDetail.getId().toString(),request.getLoginId(),"Item Created Successfully");
    }

    public GetAllItemsResponse getAllItemsDetail(String loginId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication !=null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof CustomUserDetails){
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            String curr_user = userDetails.getUsername();
            System.err.println("Curr User is : "+curr_user);
            Long userId = userDetails.getId();
            List<ItemDetailTable> itemTable = vendorItemRepository.findByLoginIdAndAuctionActiveNullAndAuctionEndedNull(loginId);
            System.out.println(itemTable);

            System.out.println("Fetching Upcoming Aution");
            GetVendorUpcomingAuctionResponse upAuction = upcomingAuctionService.getVendorUpcomingAuction(loginId);

            GetVendorOngoingAuctionResponse onAuction = ongoingAuctionService.getVendorAuctions(loginId,userId);

            GetVendorListedAuctionResponse listAuction = listedAuctionService.getVendorAuctions(loginId, userId);

            GetVendorEndedAuctionResponse endedAuction = endedAuctionService.getVendorAuctions(loginId, userId);
            
            GetAllItemsResponse response = new GetAllItemsResponse();

            if(upAuction.getErrorCode()=="0"){
                response.setUpcomingAuction(upAuction);
                System.out.println(upAuction);
            }
            if(listAuction.getErrorCode()=="0"){
                response.setListedAuction(listAuction);
                System.out.println(listAuction);
            }
            if(onAuction.getErrorCode()=="0"){
                response.setOngoingAuction(onAuction);
                System.out.println(onAuction);
            }
            if(endedAuction.getErrorCode()=="0"){
                System.out.println(endedAuction);
                response.setEndAuction(endedAuction);
            }
            if(!itemTable.isEmpty()){
                System.out.println(itemTable);
                response.setItemDetails(itemTable);
            }

            response.setErrorCode("0");
            response.setMessage("Successfully fetched the auction details for the users");
            return response;
            // return new ArrayList<ItemDetailTable>();

        }
        else{
            System.out.println("No Authentication object was found");
            throw new RuntimeException("No Authentication token is found");
        }

        
        // System.err.println(optionalTable);

    }

    @Transactional
    public CreateItemResponse createAndPublishItem(CreateAndPublishItemRequest request, Map<String,List<MultipartFile>> images){
        System.out.println("Inside the creatItem and publish request");

        if(request.getLoginId() == null){
            return new CreateItemResponse("-1","None","No UserId found for this request");
        }
        System.err.println("HHHHH----000-----HHHHH"+request.getLoginId());
        System.err.println(request);
        Optional<UserVendor> user = vendorUserRepository.findByLoginId(request.getLoginId());
        System.out.println(user);
        if(user.isEmpty()){
            return new CreateItemResponse("-1",request.getLoginId(),"No UserId found for this request");
        }
        System.err.println("HHHHH----111-----HHHHH");

        ItemDetailTable itemTable = new ItemDetailTable();
        itemTable.setLoginId(request.getLoginId());
        itemTable.setCompanyName(request.getCompanyName());
        itemTable.setAuctionType(request.getAuctionType());
        itemTable.setAuctionTitle(request.getAuctionTitle());
        itemTable.setAuctionDescription(request.getAuctionDescription());
        itemTable.setAuctionLotType(request.getAuctionLotType());
        itemTable.setCreatedAt(LocalDateTime.now());
        itemTable.setAuctionActive(true);
        itemTable.setAuctionEnded(false);
        // itemTable.setTotalWeight(request.getTotalWeight());
        System.err.println("HHHHH----222-----HHHHH");

        //Creating the Items Lot table
        List<ItemLotDetailTable> itemLotDetails = this.createItemLotTable(request.getAuctionLotDetails(), images, itemTable,request.getLoginId());

        System.err.println("HHHHH----555-----HHHHH");
        
        itemTable.setItemLotDetails(itemLotDetails);
        itemTable.setUser(user.orElse(null));
        
        ItemDetailTable savedItemDetail = vendorItemRepository.save(itemTable);
        
        System.out.println("Item Detail Table has been saved");

        System.out.println("Now savint the auction details");
        
        CreateUpcomingAuctionDTO data = new CreateUpcomingAuctionDTO();

        data.setAuctionPublishDate(request.getAuctionPublishDate());
        data.setAuctionStartDate(request.getAuctionStartDate());
        data.setAuctionEndDate(request.getAuctionEndDate());
        data.setMinBidderRequired(Integer.parseInt(request.getMinBidderRequired()));
        data.setAuctionTitle(request.getAuctionTitle());
        data.setAuctionType(request.getAuctionType());
        data.setAuctionDescription(request.getAuctionDescription());
        data.setAuctionLotType(request.getAuctionLotType());
        data.setCreationTime(itemTable.getCreatedAt());
        // data.setVendor_id(user.getId());
        data.setItemId(savedItemDetail.getId());
        System.err.println("Getting the userId from user");
        Long userId = user.map(UserVendor::getId).orElse(null); // Or handle the absence of a user differently
        if (userId != null) {
            // Use the userId
            System.out.println("User ID: " + userId);
        } else {
            // Handle the case where the user is not found
            System.out.println("User not found for login ID: " + request.getLoginId());
        }
        data.setVendorId(userId);
        System.err.println("Data oobject is prepared");
        UpcomingAuctionSaveResponse auctionSaveResponse = upcomingAuctionService.createUpcomingAuction(data);
        
        if(auctionSaveResponse == null || auctionSaveResponse.getId() == null){
            System.out.println("Item Auction Details Saving Failed Successfulyy");
            return new CreateItemResponse("-1",request.getLoginId(),"Error while saving the Auction Details");
        }

        CreateItemResponse response = new CreateItemResponse();
        response.setId(String.valueOf(auctionSaveResponse.getId()));
        response.setUsername(request.getLoginId());
        response.setMessage("Item Details Stored and Auction Details saved successfully ");
        
        return response;



        // return "Ehllo";
    }

    public List<ItemLotDetailTable> createItemLotTable(List<ItemLotDetailDTO> request, Map<String,List<MultipartFile>> images,ItemDetailTable itemTable,String loginId){
        System.err.println("Inside helper function createItemTable");

        List<ItemLotDetailTable> itemLotDetails = request.stream().map(
            lotDetail -> {
                ItemLotDetailTable lot = new ItemLotDetailTable();
                lot.setAuctionLotNumber(lotDetail.getAuctionLotNumber());
                lot.setProductCategory(lotDetail.getProductCategory());
                lot.setLotWeight(lotDetail.getLotWeight());
                lot.setLotEMD(lotDetail.getLotEMD());
                lot.setLotAuctionAmount(lotDetail.getLotAuctionAmount());
                lot.setLotAddress(lotDetail.getLotAddress());
                lot.setLotCity(lotDetail.getLotCity());
                lot.setLotState(lotDetail.getLotState());
                lot.setLotPostalCode(lotDetail.getLotPostalCode());
                lot.setLotSellerContactNumber(lotDetail.getLotSellerContactNumber());
                lot.setLotDescription(lotDetail.getLotDescription());
                System.err.println("HHHHH----333-----HHHHH");

                // Crating an object to save the image table list
                List<LotsImageTable> lotImageTables = new ArrayList<>();
                for(Map.Entry<String, List<MultipartFile> > entry : images.entrySet()){
                    System.out.println("Lot Number: " + entry.getKey());
                    System.out.println("Value Class: " + entry.getValue().getClass());
                    for(MultipartFile file : entry.getValue()){
                        System.out.println("file : "+file.getOriginalFilename());
                    }
                }
                // Gettin images file for the respective lotNumber
                List<MultipartFile> files = images.get(lot.getAuctionLotNumber());
                if (files != null) { // Ensure there are files for this lot
                    for (MultipartFile img : files) {
                        LotsImageTable image = new LotsImageTable();
                        try {
                            // Setting the image values and adding it to list of lotTableImages
                            System.err.println("HHHHH----343-----HHHHH Image Id is : "+image.getId()+lot.getId());
                    
                            image.setUrl(imgService.saveImage(img, loginId,itemTable.getCreatedAt(),lot.getAuctionLotNumber()));
                            image.setItemLotTable(lot);
                            System.err.println("HHHHH----444-----HHHHH");
                
                            lotImageTables.add(image);
                        } catch (Exception e) {
                            System.err.println("Exception while saving the image data to backend");
                            throw new RuntimeException("Error while saving the image data to backend: " + e.getMessage());
                        }
                    }
                }
                
                
                lot.setImages(lotImageTables);
                lot.setItemTable(itemTable);
                return lot;
            }).toList();
            
        System.err.println("HHHHH----555-----HHHHH");

        return itemLotDetails;
    }
}
