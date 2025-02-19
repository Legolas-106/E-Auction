// package com.auction.z_backend.auth.security.usr;

// import java.util.Collections;
// import java.util.Optional;

// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.auction.z_backend.auth.model.CustomUserDetails;
// import com.auction.z_backend.bidder.model.UserBidder;
// import com.auction.z_backend.bidder.repository.BidderUserRepository;
// import com.auction.z_backend.vendor.model.UserVendor;
// import com.auction.z_backend.vendor.repository.VendorUserRepository;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {
//     private final BidderUserRepository bidderRepository;
//     private final VendorUserRepository vendorRepository;

//     public CustomUserDetailsService(
//             BidderUserRepository bidderRepository,
//             VendorUserRepository vendorRepository) {
//         this.bidderRepository = bidderRepository;
//         this.vendorRepository = vendorRepository;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
//         Optional<UserBidder> bidder = bidderRepository.findByLoginId(loginId);
//         if (bidder.isPresent()) {
//             UserBidder user = bidder.get();
//             return new CustomUserDetails(
//                 user.getId(),
//                 user.getLoginId(),
//                 user.getPassword(),
//                 UserTypes.BIDDER,
//                 Collections.singletonList(new SimpleGrantedAuthority(UserTypes.BIDDER.getAuthority()))
//             );
//         }

//         Optional<UserVendor> vendor = vendorRepository.findByLoginId(loginId);
//         if (vendor.isPresent()) {
//             UserVendor user = vendor.get();
//             return new CustomUserDetails(
//                 user.getId(),
//                 user.getLoginId(),
//                 user.getPassword(),
//                 UserTypes.VENDOR,
//                 Collections.singletonList(new SimpleGrantedAuthority(UserTypes.VENDOR.getAuthority()))
//             );
//         }

//         throw new UsernameNotFoundException("User not found with login id: " + loginId);
//     }
// }