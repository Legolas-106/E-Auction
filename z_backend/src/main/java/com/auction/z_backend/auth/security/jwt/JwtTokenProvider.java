package com.auction.z_backend.auth.security.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auction.z_backend.auth.security.usr.UserTypes;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access.expiration}")
    private int jwtAccessTokenExpiration;

    @Value("${jwt.refresh.expiration}")
    private Long jwtRefreshTokenExpiration;

    private SecretKey secretKey;

    @jakarta.annotation.PostConstruct
    protected void init() {
        secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public List<String> generateToken(Long userId, String loginId, UserTypes userType) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtAccessTokenExpiration);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("loginId", loginId);
        claims.put("userType", userType);
        claims.put("createdAt", now.getTime());
        
        String access_token = Jwts.builder().setClaims(claims)
                                .setIssuedAt(now)
                                .setExpiration(expiryDate)
                                .signWith(secretKey, SignatureAlgorithm.HS512)
                                .compact();

        expiryDate = new Date(now.getTime() + jwtRefreshTokenExpiration);

        String refresh_token = Jwts.builder().setClaims(claims)
                                .setIssuedAt(now)
                                .setExpiration(expiryDate)
                                .signWith(secretKey, SignatureAlgorithm.HS512)
                                .compact();
        return List.of(access_token,refresh_token);
    }

    public Long getUserIdFromToken(String token) {
        try {
            Claims claims = parseToken(token);
            return ((Number) claims.get("userId")).longValue();
        } catch (Exception e) {
            logger.error("Error getting userId from token", e);
            throw new JwtAuthenticationException("Error extracting userId from token");
        }
    }

    public String getLoginIdFromToken(String token) {
        try {
            Claims claims = parseToken(token);
            return claims.get("loginId").toString();
        } catch (Exception e) {
            logger.error("Error getting loginId from token", e);
            throw new JwtAuthenticationException("Error extracting loginId from token");
        }
    }

    public UserTypes getUserTypeFromToken(String token) {
        try {
            Claims claims = parseToken(token);
            return UserTypes.valueOf(claims.get("userType").toString());
        } catch (Exception e) {
            logger.error("Error getting userType from token", e);
            throw new JwtAuthenticationException("Error extracting userType from token");
        }
    }

    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
            throw new JwtAuthenticationException("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
            throw new JwtAuthenticationException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
            throw new JwtAuthenticationException("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
            throw new JwtAuthenticationException("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty");
            throw new JwtAuthenticationException("JWT claims string is empty");
        }
    }

    private Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Date getExpirationDateFromToken(String token) {
        return parseToken(token).getExpiration();
    }

    public boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
