package com.auction.z_backend.auth.config;


import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auction.z_backend.auth.security.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("Configuring Security Filter Chain...");
        http
            .cors().and() // Enable CORS
            .csrf().disable() // Disable CSRF for simplicity (not recommended for production)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**", "/api/auth/**","/api/searchAuction/**","/api/bidder/register","/api/vendor/register","/api/common/**").permitAll()
                .requestMatchers("/api/vendor/**").hasRole("VENDOR")
                .requestMatchers("/api/bidder/**").hasRole("BIDDER")
                // Bidder-specific endpoints
                // .requestMatchers("/api/bidder/**").authenticated()
                
                // // Admin-only endpoints
                // .requestMatchers("/api/admin/**").hasRole("ADMIN")
                
                // // Vendor-specific endpoints
                // // .requestMatchers("/api/vendor/**").authenticated()
                // // .requestMatchers("/api/vendor/**").hasRole("VENDOR")
                
                
                // // Authenticated user endpoints
                // .requestMatchers("/api/user/**").authenticated()

                
                // Default: deny all other requests
                // .anyRequest().denyAll()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        // Create an AuthenticationManager using the AuthenticationManagerBuilder
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}