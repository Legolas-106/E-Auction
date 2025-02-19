package com.auction.z_backend.auth.dto.response;

import com.auction.z_backend.auth.security.usr.UserTypes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AuthResponse {
    private String loginId;
    private String accessToken;
    private String refershToken;
    private UserTypes userType;
    private String name;
    private UserDetailsDto userDetails;
    private UserCompanyDetailsDTO userCompanyDetails;
}
