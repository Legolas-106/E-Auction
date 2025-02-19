package com.auction.z_backend.bidder.model;

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
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="UserBidder")
public class UserBidder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false,unique=true)
    private String loginId;
    
    @Column(nullable = false)
    private String password;

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

    @Column
    private Boolean preferentialBidder;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="company_details_id",referencedColumnName="id")
    private BidderCompanyDetails companyDetails;

    public void setCompanyDetails(BidderCompanyDetails companyDetails){
        this.companyDetails = companyDetails;
        if(companyDetails!=null){
            this.companyDetails.setUser(this);
        }
    }
}
