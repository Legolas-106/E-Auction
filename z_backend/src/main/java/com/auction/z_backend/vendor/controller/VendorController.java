package com.auction.z_backend.vendor.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.auction.z_backend.auth.dto.response.AuthResponse;
import com.auction.z_backend.security.jwt.JwtTokenProvider;
import com.auction.z_backend.vendor.dto.request.CreateItemRequest;
import com.auction.z_backend.vendor.dto.request.VendorSignupRequest;
import com.auction.z_backend.vendor.dto.response.CreateItemResponse;
import com.auction.z_backend.vendor.model.ItemDetailTable;
import com.auction.z_backend.vendor.service.VendorItemService;
import com.auction.z_backend.vendor.service.VendorRegisterService;

@RestController
@RequestMapping("/api/vendor")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorController {

    private final VendorRegisterService registerTheVendor;
    private final VendorItemService vendorItemService;
    private final JwtTokenProvider jwtTokenProvider;
    private static final Logger logger = LoggerFactory.getLogger(VendorController.class);

    public VendorController(VendorRegisterService registerTheVendor,VendorItemService vendorItemService,JwtTokenProvider jwtTokenProvider){
        this.registerTheVendor = registerTheVendor;
        this.vendorItemService = vendorItemService;   
        this.jwtTokenProvider = jwtTokenProvider;
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> vendorRegisterController(@RequestBody @Valid VendorSignupRequest request, BindingResult bindingResult){
        //Perform Validation checks if required
        if(bindingResult.hasErrors()){
            logger.debug("Request is failed in validation checks");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in validation check or request");
        }
        System.err.println("Inside vendor registraton");
        try {
            AuthResponse response = registerTheVendor.vendorRegister(request);
            return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(response);
        } catch (Exception e) {
            logger.debug("Error occured while getting response from service");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error occur in receiving service response "+e.getMessage());
        }
    }

    @PostMapping(value="/createItem",consumes="multipart/form-data")
    public ResponseEntity<?> createItem(@RequestPart("request") @Valid CreateItemRequest request,@RequestParam Map<String, MultipartFile> images,BindingResult bindingResult){
        System.err.println("Request reached is : "+request);
        if(bindingResult.hasErrors()){
            logger.debug("Request is failed in validation checks");
            System.err.println("Yoooooooooooo----------------------");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in validation check or request");
        }
        try {
            System.err.println(images);
            Map<String, List<MultipartFile>> imagesToSent = new HashMap<>();

        // Regex pattern to extract lotNumber from "images[lotNumber][index]"
            Pattern pattern = Pattern.compile("images\\[(\\d+)\\]\\[\\d+\\]");

            for (Map.Entry<String, MultipartFile> entry : images.entrySet()) {
                Matcher matcher = pattern.matcher(entry.getKey());
                if (matcher.matches()) {
                    String lotNumber = matcher.group(1); // Extract lotNumber
                    imagesToSent.computeIfAbsent(lotNumber, k -> new ArrayList<>()).add(entry.getValue());
                }
            }
            imagesToSent.forEach((lot, fileList) -> {
                System.out.println("Lot Number: " + lot);
                fileList.forEach(file -> System.out.println("Received file: " + file.getOriginalFilename()));
            });



        // 
            // System.err.println("Now handling the images and mapping");
            // System.out.println(allParams);
            // for(Map.Entry<String,MultipartFile[] > entry : allParams.entrySet()){
                //     System.err.println(entry.getValue());
                //     try {
                    //         // List<MultipartFile> file = entry.getValue();
                    //         // System.err.println(file);
                    //     } catch (Exception e) {

            //     }
            // }    
            CreateItemResponse response = vendorItemService.creatVendorItem(request,imagesToSent);
            Map<String,String> res = new HashMap<>();
            res.put("ErrorCode", "0");
            res.put("message", "Item created Successfully");
            res.put("ItemId", response.getId());
            return ResponseEntity.status(201).body(res);

        } catch (Exception e){
            System.err.println("Error while sending from controller to service "+e.getMessage());
            return ResponseEntity.status(400).body("Error while sending from controller to service "+e.getMessage());
        }
    }

    @GetMapping("/getListedItems")
    public ResponseEntity<?> listAllItems(@RequestHeader("Authorization") String authHeader){
        if(authHeader.startsWith("Bearer")){
            String token = authHeader.substring(7);
            if(!jwtTokenProvider.validateToken(token)){
                return ResponseEntity.status(403).body("Token Validation Failed");
            }
            String loginId = jwtTokenProvider.getLoginIdFromToken(token);
            System.err.println("Now getting the list");
            List<ItemDetailTable> list = vendorItemService.getAllItemsDetail(loginId);
            
            return ResponseEntity.status(200).body(list);
        }
        return ResponseEntity.status(201).body("Request reached");
    }

    @PostMapping(value="/upload-file", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadItem(@RequestPart MultipartFile[] file){
        System.err.println(file);
        Map<String, String> response = new HashMap<>();
        // Arrays.stream(file).map(img->{

        // })
        return ResponseEntity.status(200).body(response);
    }

}
