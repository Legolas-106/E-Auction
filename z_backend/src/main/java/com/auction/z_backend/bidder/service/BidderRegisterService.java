package com.auction.z_backend.bidder.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auction.z_backend.auth.dto.response.AuthResponse;
import com.auction.z_backend.auth.dto.response.UserCompanyDetailsDTO;
import com.auction.z_backend.auth.dto.response.UserDetailsDto;
import com.auction.z_backend.auth.security.jwt.JwtTokenProvider;
import com.auction.z_backend.auth.security.usr.UserTypes;
import com.auction.z_backend.bidder.dto.request.BidderSignupRequest;
import com.auction.z_backend.bidder.model.BidderCompanyDetails;
import com.auction.z_backend.bidder.model.UserBidder;
import com.auction.z_backend.bidder.repository.BidderUserRepository;
import com.auction.z_backend.common.utils.user.UserDetailUtility;
import com.auction.z_backend.vendor.repository.VendorUserRepository;

import jakarta.transaction.Transactional;

@Service
public class BidderRegisterService {

    private final BidderUserRepository bidderUserRepository;
    private final VendorUserRepository vendorUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private static final Logger logger = LoggerFactory.getLogger(BidderRegisterService.class);

    public BidderRegisterService(BidderUserRepository bidderUserRepository, VendorUserRepository vendorUserRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.bidderUserRepository = bidderUserRepository;
        this.vendorUserRepository = vendorUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public AuthResponse bidderRegister(BidderSignupRequest request) {
        logger.debug("Bidder Signup Request is reached till its Service");
        System.out.println("Hello");
        System.out.println(request);
        AuthResponse response = new AuthResponse();
        

        if (request.getLoginId()=="") {
            System.out.println("Checking Login ID");
            throw new RuntimeException("ErrorCode:-1 Valid request is not reached to backend");
        }
        System.out.println("Checked Login ID");

        logger.debug("Checking for existence in repositories");

        try {
            System.out.println("Checking Login ID in repository");
            System.out.println(request.getLoginId());
            System.out.println(vendorUserRepository.existsByLoginId(request.getLoginId()));
            System.err.println(bidderUserRepository.existsByLoginId(request.getLoginId()));

            if (!vendorUserRepository.existsByLoginId(request.getLoginId()) && !bidderUserRepository.existsByLoginId(request.getLoginId())) {
                System.out.println("Checked Login ID in repository");

                
                if (request.getUserType() == UserTypes.BIDDER) {

                    String hashedPassword = passwordEncoder.encode(request.getPassword());

                    UserBidder bidder = new UserBidder();
                    bidder.setLoginId(request.getLoginId());
                    bidder.setEmail(request.getEmail());
                    bidder.setPassword(hashedPassword);
                    bidder.setName(request.getName());
                    bidder.setContactNumber(request.getContactNumber());
                    bidder.setTypeOfUser(request.getUserType());
                    bidder.setPreferentialBidder(request.getPreferentialBidder());

                    logger.debug("Bidder details are being stored");

                    try {

                        BidderCompanyDetails company = setBidderCompanyDetails(request.getCompanyDetails());

                        bidder.setCompanyDetails(company);

                        UserBidder savedBidder = bidderUserRepository.save(bidder);
                        logger.debug("Bidder is successfully registered to the database");

                        try {
                            List<String> token = jwtTokenProvider.generateToken(savedBidder.getId(), hashedPassword, savedBidder.getTypeOfUser());
                            logger.debug("Token Generated: " + token);

                            // AuthResponse response = new AuthResponse();
                            UserDetailsDto userDetail = new UserDetailsDto();
                            UserCompanyDetailsDTO userCompany = new UserCompanyDetailsDTO();

                            userDetail.setLoginId(bidder.getLoginId());
                            userDetail.setEmail(bidder.getEmail());
                            userDetail.setTitle(bidder.getName());
                            userDetail.setContactNumber(bidder.getContactNumber());
                            userDetail.setDesignation(bidder.getDesignation());
                            userDetail.setDateOfBirth(bidder.getDateOfBirth());

                            // BidderCompanyDetails company = bidder.getCompanyDetails();

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
                        } catch (Exception e) {
                            throw new RuntimeException("ErrorCode:-5 Token Creation Failed");
                        }
                    } catch (Exception e) {
                        throw new RuntimeException("ErrorCode:-6 Failed to save the bidder data: " + e.getMessage());
                    }
                } else {
                    throw new RuntimeException("ErrorCode:-8 UserType is not according to Registration Type");
                }

            } else {
                response.setLoginId(request.getLoginId());
                response.setAccessToken(null);
                response.setRefershToken(null);
                response.setName("Login ID Already Exist");
                response.setUserType(UserTypes.BIDDER);
                return response;

                // throw new RuntimeException("ErrorCode:-9 User already exists");
            }
        } catch (Exception e) {
            logger.debug("ErrorCode:-10 " + e.getMessage());
        }

        return new AuthResponse();
    }

    private BidderCompanyDetails setBidderCompanyDetails(BidderCompanyDetails bidderDetails) {
        BidderCompanyDetails newBidderDetails = new BidderCompanyDetails();
        newBidderDetails.setCompanyName(bidderDetails.getCompanyName());
        newBidderDetails.setCompanyRegNumber(bidderDetails.getCompanyRegNumber());
        newBidderDetails.setRegisterdAddress(bidderDetails.getRegisterdAddress());
        newBidderDetails.setCity(bidderDetails.getCity());
        newBidderDetails.setState(bidderDetails.getState());
        newBidderDetails.setPostalCode(bidderDetails.getPostalCode());
        newBidderDetails.setPan_tan(bidderDetails.getPan_tan());
        newBidderDetails.setPartnersDetail(bidderDetails.getPartnersDetail());
        newBidderDetails.setCompanyLegalStatus(UserDetailUtility.getCompanyType(bidderDetails.getCompanyLegalStatus()));
        newBidderDetails.setCompanyCategory(UserDetailUtility.getMSMEUnitType(bidderDetails.getCompanyCategory()));
        newBidderDetails.setTypeOfUserRegistered(bidderDetails.getTypeOfUserRegistered());
        newBidderDetails.setYoestabilishing(bidderDetails.getYoestabilishing());
        newBidderDetails.setCompanyNature(bidderDetails.getCompanyNature());
    
        return newBidderDetails;
    }
    
}