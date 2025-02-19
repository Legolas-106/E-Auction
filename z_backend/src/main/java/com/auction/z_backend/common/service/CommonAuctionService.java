package com.auction.z_backend.common.service;

import java.io.Console;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.auction.z_backend.auction.model.AuctionEnded;
import com.auction.z_backend.auction.model.ListedAuction;
import com.auction.z_backend.auction.model.OngoingAuction;
import com.auction.z_backend.auction.model.UpcomingAuction;
import com.auction.z_backend.auction.repository.EndedAuctionRepository;
import com.auction.z_backend.auction.repository.ListedAuctionRepository;
import com.auction.z_backend.auction.repository.OngoingAuctionRepository;
import com.auction.z_backend.auction.repository.UpcomingAuctionRepository;
import com.auction.z_backend.common.dto.request.AuctionSearchCriteria;
import com.auction.z_backend.common.dto.response.AuctionDetailDTO;
import com.auction.z_backend.common.dto.response.AuctionItemDetailsDTO;
import com.auction.z_backend.common.dto.response.AuctionSearchResponse;
import com.auction.z_backend.common.utils.DTOutils;
import com.auction.z_backend.vendor.model.ItemDetailTable;
import com.auction.z_backend.vendor.repository.VendorItemRepository;

@Service
public class CommonAuctionService {


    private final UpcomingAuctionRepository upcomingAuctionRepository;
    private final ListedAuctionRepository listedAuctionRepository;
    private final OngoingAuctionRepository ongoingAuctionRepository;
    private final EndedAuctionRepository endedAuctionRepository;
    private final VendorItemRepository vendorItemRepository;
    public CommonAuctionService(UpcomingAuctionRepository upcomingAuctionRepository
    ,ListedAuctionRepository listedAuctionRepository, OngoingAuctionRepository ongoingAuctionRepository
    , EndedAuctionRepository endedAuctionRepository
    ,VendorItemRepository vendorItemRepository){
        this.upcomingAuctionRepository = upcomingAuctionRepository;
        this.listedAuctionRepository = listedAuctionRepository;
        this.ongoingAuctionRepository = ongoingAuctionRepository;
        this.endedAuctionRepository = endedAuctionRepository;
        this.vendorItemRepository = vendorItemRepository;
    }

    public static Map<String, Object> convertModelToMap(Object model) {
        Map<String, Object> map = new HashMap<>();

        if (model == null) {
            return map; // Or throw an exception if you prefer
        }

        Class<?> modelClass = model.getClass();
        Field[] fields = modelClass.getDeclaredFields(); // Get all fields (including private)

        for (Field field : fields) {
            field.setAccessible(true); // Make private fields accessible
            String fieldName = field.getName();

            try {
                Object fieldValue = field.get(model);
                map.put(fieldName, fieldValue);
            } catch (IllegalAccessException e) {
                // Handle the exception (e.g., log it, throw a custom exception)
                System.err.println("Error accessing field " + fieldName + ": " + e.getMessage());
                // You might choose to continue or return an empty map in case of errors.
            }
        }

        return map;
    }

    // private String lotType;
    // private String auctionId;
    // private String auctionType;
    // private String productCategory;
    // private String auctionDescription;
    // private String auctionTitle;
    // private String auctionStatus;
    // private String auctionStartDate;
    // private String auctionEndDate;
    // private String auctionPublishDate;

    private AuctionDetailDTO createItemAuctionDTO(Map<String,Object> auction,String type){
        
        // Auction Object Detail
        AuctionDetailDTO dto = new AuctionDetailDTO();
        System.err.println(auction);
        String prefix = "";

        if(type.equals("upcoming")){
            prefix = "UP";
        }
        else if(type.equals("listed")){
            prefix = "LI";
        }
        else if(type.equals("ongoing")){
            prefix = "ON";
        }
        else{
            prefix = "EN";
        }


        for(Map.Entry<String,Object> obj: auction.entrySet()){
            System.out.println(obj.getKey());
            if(obj.getKey()=="auctionDescription"){
                System.out.println("Setting the description value");
                dto.setAuctionDescription(obj.getValue().toString());
            }
            else if(obj.getKey()=="auctionLotType"){
                System.out.println("Setting the lot Type value");
                dto.setLotType(obj.getValue().toString());
            }
            else if(obj.getKey()=="auctionType"){
                dto.setAuctionType(obj.getValue().toString());
            }
            else if(obj.getKey() == "id"){
                dto.setAuctionId("AUC_"+prefix+"_"+obj.getValue().toString());
            }
            else if(obj.getKey() == "auctionTitle"){
                dto.setAuctionTitle(obj.getValue().toString());
            }
            else if(obj.getKey() == "auctionStartDate"){
                dto.setAuctionStartDate(obj.getValue().toString());
            }
            else if(obj.getKey() == "auctionEndDate"){
                dto.setAuctionEndDate(obj.getValue().toString());
            }
            else if(obj.getKey() == "product"){
                // dto.setProductCategory(obj.getValue().?toString());
            }
            else if(obj.getKey() == "auctionPublishDate"){
                dto.setAuctionPublishDate(obj.getValue().toString());
            }
            else if(obj.getKey() == "upcomingAuctionId"){
                Long auctionId = Long.parseLong(obj.getValue().toString());
                Optional<UpcomingAuction> upAuc = upcomingAuctionRepository.findById(auctionId);
                if(upAuc.isPresent()){
                    UpcomingAuction upAuction = upAuc.get();
                    Map<String,Object> newObj = convertModelToMap(upAuction);
                    AuctionDetailDTO newDto = createItemAuctionDTO(newObj, "upcoming");
                    
                    if(dto.getAuctionId()!=""){
                        newDto.setAuctionId(dto.getAuctionId());
                        newDto.setAuctionStatus(type);
                    }
                    return newDto;

                }

            }
            else if(obj.getKey() == "itemId"){
                Long itemId = Long.parseLong(obj.getValue().toString());
                Optional<ItemDetailTable> opt_item = vendorItemRepository.findById(itemId);
                if(opt_item.isPresent()){
                    ItemDetailTable item = opt_item.get();
                    List <AuctionItemDetailsDTO> itemList = item.getItemLotDetails()
                    .stream()
                    .map(ele -> {
                        AuctionItemDetailsDTO itemDto = new AuctionItemDetailsDTO();
                        itemDto.setLotDescription(ele.getLotDescription());
                        itemDto.setCity(ele.getLotCity());
                        itemDto.setState(ele.getLotState());
                        itemDto.setProdCategory(ele.getProductCategory());
                        itemDto.setWeight(ele.getLotWeight());
                        itemDto.setEmd(ele.getLotEMD());
                        List<String> images = ele.getImages().stream().map(img->{
                            return img.getUrl();
                        })
                        .toList();
                        itemDto.setImages(images);
                        return itemDto;
                    })
                    .toList();
                    dto.setItemDetails(itemList);
                }
            }
        }
        dto.setAuctionStatus(type);
        return dto;
        // if(auction.containsKey("lotType")){
        //     auctionDto.setLotType(auction.get("lotType"));
        // }
        // if()

        
        // Item object Detail
    }

    public AuctionSearchResponse searchAuctions(AuctionSearchCriteria searchCriteria){
        
        System.out.println("Inside auction search service");
        System.out.println(searchCriteria);
        AuctionSearchResponse response = new AuctionSearchResponse();
        // Checking is auctionStatus is present or not.
        String auctionStatus = "";
        String auctionId = "";
        Integer params = DTOutils.countNonEmptyFields(searchCriteria);
        if(searchCriteria.getAuctionStatus()!=null){
            auctionStatus = searchCriteria.getAuctionStatus();
            // params++;
        }
        if(searchCriteria.getAuctionId()!=null){
            auctionId = searchCriteria.getAuctionId();
            // params++;
        }

        System.out.println("Auction Status is : "+auctionStatus+" Auction ID is: "+auctionId);
        if(auctionId != "" && auctionId!=null){
            try {
                System.out.println("Deciphering the auction key "+auctionId);
                if(auctionId.startsWith("AUC_UP_")){
                    Long aucId = Long.parseLong(auctionId.replaceFirst("^AUC_UP_",""));
                    Optional<UpcomingAuction> opt_auc = upcomingAuctionRepository.findById(aucId);

                    if(opt_auc.isPresent()){
                        UpcomingAuction auc = opt_auc.get();
                        Long itemId = auc.getItemId();
                        if(itemId != null){
                            Optional<ItemDetailTable> opt_item = vendorItemRepository.findById(itemId);
                            if(opt_item.isPresent()){
                                ItemDetailTable item = opt_item.get();
                                // Create the model and send it.
                                AuctionSearchResponse aucSearchResp = new AuctionSearchResponse();
                                aucSearchResp.setTotalAuctions(1);
                                Map<String,Object> modelObject = convertModelToMap(auc);
                                AuctionDetailDTO aucDto = createItemAuctionDTO(modelObject,"Upcoming");
                                aucSearchResp.setSearchTime(LocalDateTime.now());
                                aucSearchResp.setAuctionDetails(Collections.singletonList(aucDto));
                                return aucSearchResp;
                            }
                            else{
                                throw new RuntimeException("No Data found for th egiven auction ID");
                            }
                        }

                    }
                }
                else if(auctionId.startsWith("AUC_LI_")){
                    Long aucId = Long.parseLong(auctionId.replaceFirst("^AUC_UP_",""));
                    Optional<ListedAuction> opt_auc = listedAuctionRepository.findById(aucId);

                    if(opt_auc.isPresent()){
                        ListedAuction auc = opt_auc.get();
                        Long itemId = auc.getItemId();
                        if(itemId != null){
                            Optional<ItemDetailTable> opt_item = vendorItemRepository.findById(itemId);
                            if(opt_item.isPresent()){
                                ItemDetailTable item = opt_item.get();
                                // Create the model and send it.
                                AuctionSearchResponse aucSearchResp = new AuctionSearchResponse();
                                aucSearchResp.setTotalAuctions(1);
                                Map<String,Object> modelObject = convertModelToMap(auc);
                                AuctionDetailDTO aucDto = createItemAuctionDTO( modelObject,"Listed");
                                aucSearchResp.setSearchTime(LocalDateTime.now());
                                aucSearchResp.setAuctionDetails(Collections.singletonList(aucDto));
                                return aucSearchResp;
                            }
                            else{
                                throw new RuntimeException("No Data found for th egiven auction ID");
                            }
                        }

                    }
                }
                else if(auctionId.startsWith("AUC_ON_")){
                    Long aucId = Long.parseLong(auctionId.replaceFirst("^AUC_UP_",""));
                    Optional<OngoingAuction> opt_auc = ongoingAuctionRepository.findById(aucId);

                    if(opt_auc.isPresent()){
                        OngoingAuction auc = opt_auc.get();
                        Long itemId = auc.getItemId();
                        if(itemId != null){
                            Optional<ItemDetailTable> opt_item = vendorItemRepository.findById(itemId);
                            if(opt_item.isPresent()){
                                ItemDetailTable item = opt_item.get();
                                // Create the model and send it.
                                AuctionSearchResponse aucSearchResp = new AuctionSearchResponse();
                                aucSearchResp.setTotalAuctions(1);
                                Map<String,Object> modelObject = convertModelToMap(auc);
                                AuctionDetailDTO aucDto = createItemAuctionDTO(modelObject,"Ongoing");
                                aucSearchResp.setSearchTime(LocalDateTime.now());
                                aucSearchResp.setAuctionDetails(Collections.singletonList(aucDto));
                                return aucSearchResp;
                            }
                            else{
                                throw new RuntimeException("No Data found for th egiven auction ID");
                            }
                        }

                    }
                }
                else if(auctionId.startsWith("AUC_EN")){
                    Long aucId = Long.parseLong(auctionId.replaceFirst("^AUC_UP_",""));
                    Optional<AuctionEnded> opt_auc = endedAuctionRepository.findById(aucId);

                    if(opt_auc.isPresent()){
                        AuctionEnded auc = opt_auc.get();
                        Long itemId = auc.getItemId();
                        if(itemId != null){
                            Optional<ItemDetailTable> opt_item = vendorItemRepository.findById(itemId);
                            if(opt_item.isPresent()){
                                ItemDetailTable item = opt_item.get();
                                // Create the model and send it.
                                AuctionSearchResponse aucSearchResp = new AuctionSearchResponse();
                                aucSearchResp.setTotalAuctions(1);
                                Map<String,Object> modelObject = convertModelToMap(auc);
                                AuctionDetailDTO aucDto = createItemAuctionDTO( modelObject,"Ended");
                                aucSearchResp.setSearchTime(LocalDateTime.now());
                                aucSearchResp.setAuctionDetails(Collections.singletonList(aucDto));
                                return aucSearchResp;
                            }
                            else{
                                throw new RuntimeException("No Data found for th egiven auction ID");
                            }
                        }

                    }
                }
                else{
                    System.out.println("Invalid Auction id is sreved");
                    //Either continue with rest of parameters
                    if(params<2){
                        throw new RuntimeException("No data found for the given auction ID");
                    }
                }

            } catch (Exception e) {
                System.out.println("Error while fetching details using ID");
                throw new RuntimeException("Error while fetching the auction thorugh key");
            }
        }
        if(!auctionStatus.equals("")){
            System.err.println(auctionStatus.getClass()+auctionStatus);
            if(auctionStatus.equals("ongoing")){
               List<OngoingAuction> onAuc = ongoingAuctionRepository.searchAuctions(null, null, null, null, null, null, null, null, null, null);

               response.setTotalAuctions(onAuc.size());
               List<AuctionDetailDTO> auctionDto = onAuc.stream().map(auction ->{
                    Map<String,Object> obj = convertModelToMap(onAuc);
                    return createItemAuctionDTO(obj, "ongoing");
               })
               .toList();
               response.setAuctionDetails(auctionDto);
               response.setSearchTime(LocalDateTime.now());
               return response;

            }
            else if(auctionStatus.equals("listed")){
                List<ListedAuction> listAuc = listedAuctionRepository.searchAuctions(null, null, null, null, null, null, null, null, searchCriteria.getFromDate(), null, searchCriteria.getToDate(), null, null, null, null, null);
                
                response.setTotalAuctions(listAuc.size());
                List<AuctionDetailDTO> auctionDto = listAuc.stream().map(ele->{
                    Map<String,Object> obj = convertModelToMap(ele);
                    return createItemAuctionDTO(obj, "listed");
                })
                .toList();
                response.setAuctionDetails(auctionDto);
                response.setSearchTime(LocalDateTime.now());
                return response;
            }
            else if(auctionStatus.equals("upcoming")){
                List<UpcomingAuction> upAuc = upcomingAuctionRepository.searchAuctions(searchCriteria.getLotType(),null, searchCriteria.getAuctionType(), searchCriteria.getFromDate(),searchCriteria.getToDate());
                
                response.setTotalAuctions(upAuc.size());
                List<AuctionDetailDTO> auctionDto = upAuc.stream().map(ele->{
                    Map<String,Object> obj = convertModelToMap(ele);
                    return createItemAuctionDTO(obj, "upcoming");
                })
                .toList();
                response.setAuctionDetails(auctionDto);
                response.setSearchTime(LocalDateTime.now());
                return response;
            }
            else if(auctionStatus.equals("ended")){
                List<AuctionEnded> enAuc = endedAuctionRepository.searchAuctions(null,null,null,null,null,null,null,null,null,null);

                response.setTotalAuctions(enAuc.size());
                List<AuctionDetailDTO> auctionDto = enAuc.stream().map(auction->{
                    Map<String, Object> obj = convertModelToMap(enAuc);
                    return createItemAuctionDTO(obj, "ended");
                })
                .toList();
                response.setAuctionDetails(auctionDto);
                response.setSearchTime(LocalDateTime.now());
                return response;

            }
            else{
                System.out.println("Unsupported Criteria is received for auction Status");
                throw new RuntimeException("Unsupported Search Criteria is given");
            }
        }
        
        
        System.out.println("Getting the general search Infomation");
        
        try{
            // Upcoming Auction
            Integer totalAuctions = 0;
            List<AuctionDetailDTO> auctionDto = new ArrayList<>();
            try{
                List<UpcomingAuction> upAuc = upcomingAuctionRepository.searchAuctions(searchCriteria.getLotType(),null,searchCriteria.getAuctionType(),searchCriteria.getFromDate(),searchCriteria.getToDate());
                if(!upAuc.isEmpty()){
                    totalAuctions += upAuc.size();

                    List<AuctionDetailDTO> upItmDto = upAuc.stream().map(ele->{
                        Map<String,Object> obj = convertModelToMap(ele);
                        return createItemAuctionDTO(obj, "upcoming");
                    })
                    .toList();
                    auctionDto.addAll(upItmDto);
                }
            }
            catch(Exception e){
                System.out.println("Error while fetching upcoming auction : "+e.getCause()+e.getMessage());
            }

            //Listed Auction

            try{
                List<ListedAuction> listedAuc = listedAuctionRepository.searchAuctions(null,null,null,null,null,null,searchCriteria.getAuctionType(),searchCriteria.getLotType(),searchCriteria.getFromDate(),null,searchCriteria.getToDate(),null,null,null,null,null);
                if(!listedAuc.isEmpty()){
                    totalAuctions += listedAuc.size();

                    List<AuctionDetailDTO> listedItemDto = listedAuc.stream().map(ele->{
                        Map<String,Object> obj = convertModelToMap(ele);
                        return createItemAuctionDTO(obj, "listed");
                    })
                    .toList();
                    auctionDto.addAll(listedItemDto);
                }
            }
            catch(Exception e){
                System.out.println("Error while fetching upcoming auction : "+e.getCause()+e.getMessage());
            }

            try{
                List<OngoingAuction> onAuc = ongoingAuctionRepository.searchAuctions(null, null, null, null, null, null, null, null, null, null);
                if(!onAuc.isEmpty()){
                    totalAuctions += onAuc.size();

                    List<AuctionDetailDTO> ongoingItemDto = onAuc.stream().map(ele->{
                        Map<String,Object> obj = convertModelToMap(ele);
                        return createItemAuctionDTO(obj, "upcoming");
                    })
                    .toList();
                    auctionDto.addAll(ongoingItemDto);
                }
            }
            catch(Exception e){
                System.out.println("Error while fetching upcoming auction : "+e.getCause()+e.getMessage());
            }

            try{
                List<AuctionEnded> enAuc = endedAuctionRepository.searchAuctions(null,null,null,null,null,null,null,null,null,null);
                if(!enAuc.isEmpty()){
                    totalAuctions += enAuc.size();

                    List<AuctionDetailDTO> enItemDto = enAuc.stream().map(ele->{
                        Map<String,Object> obj = convertModelToMap(ele);
                        return createItemAuctionDTO(obj, "upcoming");
                    })
                    .toList();
                    auctionDto.addAll(enItemDto);
                }
            }
            catch(Exception e){
                System.out.println("Error while fetching upcoming auction : "+e.getCause()+e.getMessage());
            }

            System.out.println("Finally After each Auction Search Our object is created");
            response.setTotalAuctions(totalAuctions);
            response.setAuctionDetails(auctionDto);
            response.setSearchTime(LocalDateTime.now());
            return response;
        }catch(Exception e){
            throw new RuntimeException("Error in getting all auctions : "+e.getMessage());
        }

    }

}
