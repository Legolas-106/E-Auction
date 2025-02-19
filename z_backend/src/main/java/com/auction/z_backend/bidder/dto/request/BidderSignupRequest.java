package com.auction.z_backend.bidder.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.auction.z_backend.auth.security.usr.UserTypes;
import com.auction.z_backend.bidder.model.BidderCompanyDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BidderSignupRequest {

    @Email(message="Login Id should be a valid emailId")
    @NotBlank(message = "Login is is required")
    private String loginId;
    
    @NotBlank(message="password is required")
    private String password;

    @Email(message="Email should be valid")
    @NotBlank(message="Email is required")
    private String email;
    
    @NotBlank(message="Name is required")
    private String name;

    @NotBlank(message="Contact Number is required")
    private String contactNumber;
    
    @NotBlank(message="Designation is required")
    private String designation;
    
    @NotBlank(message="Date of Birth is required")
    private String dateOfBirth;
    
    @NotNull(message="Type of User is required")
    private Boolean preferentialBidder;
    
    @NotNull(message="UserType is required")
    private UserTypes userType;
    
    @NotNull(message="Company Details are required")
    private BidderCompanyDetails companyDetails;
}
