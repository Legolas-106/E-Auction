package com.auction.z_backend.auth.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.auction.z_backend.auth.security.usr.UserTypes;


public class CustomUserDetails implements UserDetails {
    private final Long id;
    private final String loginId;
    private final String password;
    private final UserTypes userType;
    private final Collection<? extends GrantedAuthority> authorities;


    public CustomUserDetails(Long id, String loginId, String password, 
                           UserTypes userType) {
                    this.id = id;
        this.loginId = loginId;
        this.password = password;
        this.userType = userType;
        // List<String> roles = determineRoles(userType);  
        System.err.println("Inside Custme USer Detail Constructor");
        System.out.println(String.valueOf(userType.getAuthorities()));                
        this.authorities = userType.getAuthorities();
        System.err.println("AUthorities are Set "+String.valueOf(authorities));
    }

    // Implement UserDetails methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return loginId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return id;
    }

    public UserTypes getUserType() {
        return userType;
    }

    public boolean hasRole(String role){
        System.out.println("Checkingt the role of User using hasRole");
        return authorities.stream()
        .map(GrantedAuthority :: getAuthority)
        .anyMatch(auth -> auth.equals("ROLE_"+role) || auth.equals(role));
    }
}
