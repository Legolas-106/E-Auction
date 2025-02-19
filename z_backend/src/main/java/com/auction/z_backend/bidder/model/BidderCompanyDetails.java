package com.auction.z_backend.bidder.model;

import com.auction.z_backend.auth.security.usr.UserTypes;

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
@Table(name="BidderCompanyDetails")
public class BidderCompanyDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String companyName;

    @Column()
    private String companyRegNumber;

    @Column()
    private String registerdAddress;
    
    @Column()
    private String partnersDetail;
    
    @Column()
    private String foreignC;
    
    @Column()
    private String city;
    
    @Column()
    private String state;
    
    @Column()
    private String postalCode;
    
    @Column()
    private String pan_tan;
    
    @Column()
    private String yoestabilishing;
    
    @Column()
    private String companyNature;

    @Column()
    private String companyLegalStatus;

    @Column()
    private String companyCategory;
    
    @Column()
    private UserTypes typeOfUserRegistered;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserBidder user;

    public void setUser(UserBidder user){
        if(user!=null){
            this.user = user;
        }
    }
}
