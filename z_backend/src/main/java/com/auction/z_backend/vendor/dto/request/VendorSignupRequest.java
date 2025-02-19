package com.auction.z_backend.vendor.dto.request;

import com.auction.z_backend.auth.security.usr.UserTypes;
import com.auction.z_backend.vendor.model.VendorCompanyDetails;

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
public class VendorSignupRequest {
    private String loginId;
    private String password;
    private String corresEmail;
    private String title;
    private String contactNumber;
    private String desig;
    private String dob;
    private String typeOfUser;
    private UserTypes userType;
    private VendorCompanyDetails companyDetails;
    
    public String getPassword(){
        return this.password;
    }
}
