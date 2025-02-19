package com.auction.z_backend.common.dto.response;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuctionItemDetailsDTO {
    private String lotDescription;
    private String city;
    private String state;
    private String prodCategory;
    private String weight;
    private String emd;
    private List<String> images;
}
