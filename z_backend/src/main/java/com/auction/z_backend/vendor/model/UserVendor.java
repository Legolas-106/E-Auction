package com.auction.z_backend.vendor.model;

import java.time.LocalDateTime;

import com.auction.z_backend.auth.security.usr.UserTypes;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="UserVendor")
public class UserVendor {

    // Define User Model
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false,unique=true)
    private String loginId;
    
    @Column(nullable = false)
    private String password;

    @Column(nullable=false)
    private LocalDateTime createdAt;

    @Column
    private String email;
    
    @Column
    private String name;
    
    @Column
    private String contactNumber;
    
    @Column
    private String designation;
    
    @Column
    private String dateOfBirth;
    
    @Column
    private UserTypes typeOfUser;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "company_details_id", referencedColumnName = "id")
    private VendorCompanyDetails companyDetails;

    public void setCompanyDetails(VendorCompanyDetails companyDetails){
        this.companyDetails = companyDetails;
        if(companyDetails!=null){
            companyDetails.setUser(this);
        }
    }

}