package com.auction.z_backend.auction.utils.upcomingAuction;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.auction.z_backend.auction.model.UpcomingAuction;

public class UpcomingAuctionSpecification {
    public static Specification<UpcomingAuction> filterAuctions(
            String auctionType, String lotType, LocalDateTime startDate, 
            LocalDateTime endDate, LocalDateTime publishDate, Long vendorId) {
        
        return (root, query, criteriaBuilder) -> {
            var predicates = criteriaBuilder.conjunction();

            if (auctionType != null) {
                predicates = criteriaBuilder.and(predicates, 
                    criteriaBuilder.equal(root.get("auctionType"), auctionType));
            }

            if (lotType != null) {
                predicates = criteriaBuilder.and(predicates, 
                    criteriaBuilder.equal(root.get("auctionLotType"), lotType));
            }

            if (startDate != null && endDate != null) {
                predicates = criteriaBuilder.and(predicates, 
                    criteriaBuilder.between(root.get("auctionStartDate"), startDate, endDate));
            }

            if (publishDate != null) {
                predicates = criteriaBuilder.and(predicates, 
                    criteriaBuilder.equal(root.get("auctionPublishDate"), publishDate));
            }

            if (vendorId != null) {
                predicates = criteriaBuilder.and(predicates, 
                    criteriaBuilder.equal(root.get("vendor_id"), vendorId));
            }

            return predicates;
        };
    }
}
