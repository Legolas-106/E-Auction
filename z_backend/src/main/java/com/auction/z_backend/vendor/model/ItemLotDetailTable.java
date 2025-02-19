package com.auction.z_backend.vendor.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "ItemLotDetailTable")
public class ItemLotDetailTable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String auctionLotNumber;
    private String productCategory;
    private String lotWeight;
    private String lotDescription;
    private String lotAddress;
    private String lotCity;
    private String lotState;
    private String lotPostalCode;
    private String lotSellerContactNumber;
    private String lotEMD;
    private String lotAuctionAmount;

    @ManyToOne
    @JoinColumn(name="item_table_id")
    private ItemDetailTable itemTable;

    @OneToMany(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private List<LotsImageTable> images;

    public void setItemTable(ItemDetailTable itemTable){
        this.itemTable = itemTable;
    }
    public void setImages(List<LotsImageTable> images){
        this.images = images;
        for(LotsImageTable x:images){
            x.setItemLotTable(this);
        }
    }
}
