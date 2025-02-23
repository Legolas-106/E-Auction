package com.auction.z_backend.vendor.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="ItemDetailTable")
public class ItemDetailTable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "User ID is required")
    @Column(name = "user_id")
    private String user_id;

    @NotBlank(message = "Login ID is required")
    @Column(name = "login_id")
    private String loginId;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "auction_type")
    private String auctionType;

    @Column(name = "product")
    private String productType;

    @NotBlank(message = "Auction title is required")
    @Size(max = 255, message = "Auction title cannot exceed 255 characters")
    @Column(name = "auction_title")
    private String auctionTitle;

    @Column(name = "auction_description", columnDefinition = "TEXT") // For longer descriptions
    private String auctionDescription;

    @Column(name = "auction_lot_type")
    private String auctionLotType;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now(); // Default to current time

    @Column(name = "auction_active")
    private Boolean auctionActive = null; // Default to null

    @Column(name = "auction_ended")
    private Boolean auctionEnded = null;

    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ItemLotDetailTable> itemLotDetails;

    public void setItemLotDetails(List<ItemLotDetailTable> itemLotTable){
        this.itemLotDetails = itemLotTable;
        if(itemLotDetails!=null){
            for(ItemLotDetailTable x : itemLotDetails){
                x.setItemTable(this);
            }
        }
    }
    public void setUser(UserVendor user){
        this.user_id = user.getLoginId();
    }
}
