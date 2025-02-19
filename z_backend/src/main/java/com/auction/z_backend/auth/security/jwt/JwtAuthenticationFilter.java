package com.auction.z_backend.auth.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auction.z_backend.auth.model.CustomUserDetails;
import com.auction.z_backend.auth.security.usr.UserTypes;
import com.auction.z_backend.bidder.model.UserBidder;
import com.auction.z_backend.bidder.repository.BidderUserRepository;
import com.auction.z_backend.vendor.model.UserVendor;
import com.auction.z_backend.vendor.repository.VendorUserRepository;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private BidderUserRepository bidderUserRepository;

    @Autowired
    private VendorUserRepository vendorUserRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, java.io.IOException {
        String path = request.getRequestURI();
        System.err.println("********** FILTER START **********");
        System.err.println("Request Path: " + path);
        System.err.println("Request Method: " + request.getMethod());
        System.err.println("Has Authorization Header: " + (request.getHeader("Authorization") != null));
            
        try {
            String jwt = getJwtFromRequest(request);
            System.err.println("Setting Authentication in context as jwt is present : "+jwt);
            if (StringUtils.hasText(jwt)) {
                if(!tokenProvider.validateToken(jwt)){
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Invalid Authentication Token");
                    return;
                }
                Long userId = tokenProvider.getUserIdFromToken(jwt);
                UserTypes userType = tokenProvider.getUserTypeFromToken(jwt);
                String loginId = tokenProvider.getLoginIdFromToken(jwt);

                System.out.println("User Id : "+String.valueOf(userId)+" UserTypes : "+String.valueOf(userType)+" LoginId is : "+loginId);
                // Load user details based on user type
                CustomUserDetails userDetails;
                if (userType == UserTypes.BIDDER) {
                    // Long userIdAsLong = Long.valueOf(userId);
                    System.out.println("Bidder Role is found");
                    UserBidder bidder = bidderUserRepository.findByLoginId(loginId)
                            .orElseThrow(() -> new UsernameNotFoundException("Bidder not found"));
                    userDetails = new CustomUserDetails(bidder.getId(), bidder.getLoginId(), 
                            bidder.getPassword(), userType);
                    System.out.println("Bidder User Details are filled");

                } else {
                    UserVendor vendor = vendorUserRepository.findByLoginId(loginId)
                            .orElseThrow(() -> new UsernameNotFoundException("Vendor not found"));
                    System.out.println("Vendor Role is Found");
                    userDetails = new CustomUserDetails(vendor.getId(), vendor.getLoginId(), 
                            vendor.getPassword(),userType);
                    System.out.println("Vendor user details are generated");
                }

                System.out.println("Authentication for role is under process "+String.valueOf(userType));
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
                System.out.println("Authentication method is created");
                
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                System.out.println("Authentication method is inserted into authentication object");

                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("Authentication is set in the auth context");

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();

                if (auth != null && auth.isAuthenticated()) {
                    // Authentication is set and the user is authenticated
                    String username = auth.getName(); // Get username
                    Object principal = auth.getPrincipal(); // Get principal (usually UserDetails)

                    if (principal instanceof CustomUserDetails) {
                        CustomUserDetails usrDetail = (CustomUserDetails) principal;
                        // Access user details:
                        String usType = usrDetail.getUserType().name(); // Example: Assuming UserTypes is an enum
                        // ... other user details
                        System.out.println("User is authenticated. Username: " + username + ", UserType: " + usType);
                    } else {
                        System.out.println("Principal is not a CustomUserDetails instance.");
                    }

                } else {
                    // Authentication is not set or the user is not authenticated
                    System.out.println("User is not authenticated.");
                }


            }
            else if(isProtectedEndpoint(request.getRequestURI())){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("No authentication token provided");
                return;
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }
        System.out.println("Now do filter method is beign called after setting up authentication in context");
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private boolean isProtectedEndpoint(String uri) {
        return uri.startsWith("/api/vendor/") || uri.startsWith("/api/bidder/") || uri.startsWith("/api/admin/");
        // Add other protected paths as needed
    }
}