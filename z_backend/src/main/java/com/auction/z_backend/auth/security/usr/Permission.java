package com.auction.z_backend.auth.security.usr;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_WRITE("admin:write"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),
    BIDDER_READ("bidder:read"),
    BIDDER_WRITE("bidder:write"),
    BIDDER_UPDATE("bidder:update"),
    BIDDER_DELETE("bidder:delete"),
    VENDOR_READ("vendor:read"),
    VENDOR_WRITE("vendor:write"),
    VENDOR_UPDATE("vendor:update"),
    VENDOR_DELETE("vendor:delete")
    ;

    @Getter
    private final String permission;

}
