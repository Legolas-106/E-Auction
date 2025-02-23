package com.auction.z_backend.auth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auction.z_backend.auth.dto.request.LoginRequest;
import com.auction.z_backend.auth.dto.response.AuthResponse;
import com.auction.z_backend.auth.dto.response.UserCompanyDetailsDTO;
import com.auction.z_backend.auth.dto.response.UserDetailsDto;
import com.auction.z_backend.auth.security.jwt.JwtTokenProvider;
import com.auction.z_backend.auth.security.usr.UserTypes;
import com.auction.z_backend.bidder.model.BidderCompanyDetails;
import com.auction.z_backend.bidder.model.UserBidder;
import com.auction.z_backend.bidder.repository.BidderUserRepository;
import com.auction.z_backend.vendor.model.UserVendor;
import com.auction.z_backend.vendor.model.VendorCompanyDetails;
import com.auction.z_backend.vendor.repository.VendorUserRepository;


@Service
public class LoginTokenService {

    private final BidderUserRepository bidderUserRepository;
    private final  VendorUserRepository vendorUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginTokenService(BidderUserRepository bidderUserRepository, VendorUserRepository vendorUserRepository,
    JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder){
        this.bidderUserRepository = bidderUserRepository;
        this.vendorUserRepository = vendorUserRepository;
        this.jwtTokenProvider  = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;

    }

    public AuthResponse authenticate(LoginRequest request) {
        // First try bidder table
        

        Optional<UserBidder> bidderOpt = bidderUserRepository.findByLoginId(request.getLoginId());
        if (bidderOpt.isPresent()) {
            System.out.println("Bidder is present : "+request.getPassword());
            UserBidder bidder = bidderOpt.get();
            System.out.println("Hashed password is "+passwordEncoder.encode(request.getPassword()));
            System.out.println("Store Hashed pass : "+bidder.getPassword());
            if (passwordEncoder.matches(request.getPassword(), bidder.getPassword())) {
                List<String> token = jwtTokenProvider.generateToken(bidder.getId(),request.getLoginId(), UserTypes.BIDDER);

                AuthResponse response = new AuthResponse();
                UserDetailsDto userDetail = new UserDetailsDto();
                UserCompanyDetailsDTO userCompany = new UserCompanyDetailsDTO();

                userDetail.setLoginId(bidder.getLoginId());
                userDetail.setEmail(bidder.getEmail());
                userDetail.setTitle(bidder.getName());
                userDetail.setContactNumber(bidder.getContactNumber());
                userDetail.setDesignation(bidder.getDesignation());
                userDetail.setDateOfBirth(bidder.getDateOfBirth());

                BidderCompanyDetails company = bidder.getCompanyDetails();

                userCompany.setCompanyName(company.getCompanyName());
                userCompany.setCompanyRegNumber(company.getCompanyRegNumber());
                userCompany.setCompanyAddress(company.getRegisterdAddress());
                userCompany.setCompanyEmailAddress(bidder.getEmail());
                userCompany.setCompanyCity(company.getCity());
                userCompany.setCompanyState(company.getState());
                userCompany.setCompanyPan_Tan(company.getPan_tan());
                userCompany.setCompanyPostalCode(company.getPostalCode());

                response.setAccessToken(token.get(0));
                response.setRefershToken(token.get(1));
                response.setLoginId(bidder.getLoginId());
                response.setName(bidder.getName());
                response.setUserType(bidder.getTypeOfUser());
                response.setUserDetails(userDetail);
                response.setUserCompanyDetails(userCompany);

                return response;
            }
            throw new RuntimeException("Invalid credentials");
        }
        
        // If not found in bidder table, try vendor table
        Optional<UserVendor> vendorOpt = vendorUserRepository.findByLoginId(request.getLoginId());
        if (vendorOpt.isPresent()) {
            UserVendor vendor = vendorOpt.get();
            if (passwordEncoder.matches(request.getPassword(), vendor.getPassword())) {
                List<String> token = jwtTokenProvider.generateToken(vendor.getId(),vendor.getLoginId(), UserTypes.VENDOR);
                
                AuthResponse response = new AuthResponse();
                UserDetailsDto userDetail = new UserDetailsDto();
                UserCompanyDetailsDTO userCompany = new UserCompanyDetailsDTO();

                userDetail.setLoginId(vendor.getLoginId());
                userDetail.setEmail(vendor.getEmail());
                userDetail.setTitle(vendor.getName());
                userDetail.setContactNumber(vendor.getContactNumber());
                userDetail.setDesignation(vendor.getDesignation());
                userDetail.setDateOfBirth(vendor.getDateOfBirth());

                VendorCompanyDetails company = vendor.getCompanyDetails();

                userCompany.setCompanyName(company.getCompanyName());
                userCompany.setCompanyRegNumber(company.getCompanyRegNumber());
                userCompany.setCompanyAddress(company.getRegisterdAddress());
                userCompany.setCompanyEmailAddress(vendor.getEmail());
                userCompany.setCompanyCity(company.getCity());
                userCompany.setCompanyState(company.getState());
                userCompany.setCompanyPan_Tan(company.getPan_tan());
                userCompany.setCompanyPostalCode(company.getPostalCode());

                response.setAccessToken(token.get(0));
                response.setRefershToken(token.get(1));
                response.setLoginId(vendor.getLoginId());
                response.setName(vendor.getName());
                response.setUserType(vendor.getTypeOfUser());
                response.setUserDetails(userDetail);
                response.setUserCompanyDetails(userCompany);

                return response;
            }
            throw new RuntimeException("Invalid credentials");
        }
        
        throw new RuntimeException("User not found");
    }
}
