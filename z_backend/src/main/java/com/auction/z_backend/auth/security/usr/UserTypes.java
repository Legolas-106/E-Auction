package com.auction.z_backend.auth.security.usr;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum UserTypes {
    USER(Collections.emptySet()),
    ADMIN(
        Set.of(
            Permission.ADMIN_READ,
            Permission.ADMIN_DELETE,
            Permission.ADMIN_UPDATE,
            Permission.ADMIN_WRITE,
            Permission.BIDDER_READ,
            Permission.BIDDER_DELETE,
            Permission.BIDDER_UPDATE,
            Permission.BIDDER_WRITE,
            Permission.VENDOR_READ,
            Permission.VENDOR_DELETE,
            Permission.VENDOR_UPDATE,
            Permission.VENDOR_WRITE
        )
    ),
    BIDDER(
        Set.of(
            Permission.BIDDER_READ,
            Permission.BIDDER_DELETE,
            Permission.BIDDER_UPDATE,
            Permission.BIDDER_WRITE
        )
    ),
    VENDOR(
        Set.of(
            Permission.VENDOR_READ,
            Permission.VENDOR_DELETE,
            Permission.VENDOR_UPDATE,
            Permission.VENDOR_WRITE
        )
    );

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities(){
        System.out.println("Getting the permissions for the user role");
        List<SimpleGrantedAuthority> authorities = new ArrayList<>(getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.name()))
                .toList());

        System.out.println("Permissions are set");
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));        
        System.out.println("Role is assigned");

        return authorities;
    }
}


