package com.auction.z_backend.auth.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.z_backend.auth.dto.request.EmailVerificationOtpRequest;
import com.auction.z_backend.auth.dto.request.LoginRequest;
import com.auction.z_backend.auth.dto.request.OtpVerificationRequest;
import com.auction.z_backend.auth.dto.response.AuthResponse;
import com.auction.z_backend.auth.dto.response.EmailVerificationOtpResponse;
import com.auction.z_backend.auth.dto.response.ErrorResponse;
import com.auction.z_backend.auth.dto.response.OtpVerificationResponse;
import com.auction.z_backend.auth.service.EmailVerificationService;
import com.auction.z_backend.auth.service.LoginTokenService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://0.0.0.0:3000")
public class AuthenticationController {

    private final EmailVerificationService emailVerify;
    private final LoginTokenService loginTokenService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    public AuthenticationController(EmailVerificationService emailVerify, LoginTokenService loginTokenService){
        this.emailVerify = emailVerify;
        this.loginTokenService = loginTokenService;
    }

    @GetMapping("test")
    public ResponseEntity<?> test(){
        return ResponseEntity.status(200).body("Requeat reached");
    }
    
    @PostMapping("/requestOtp")
    public ResponseEntity<?> requestEmailVerification(@RequestBody @Valid EmailVerificationOtpRequest request, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());
            return ResponseEntity
                .badRequest()
                .body(new ErrorResponse("Validation failed: " + String.join(", ", errors)));
        }
        System.out.println("Inside Email Verification Request");

        EmailVerificationOtpResponse response = emailVerify.generateOtp(request.getEmail());

        return ResponseEntity.status(200).body(response);
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<OtpVerificationResponse> verifyOtp(@RequestBody OtpVerificationRequest request) {
        return ResponseEntity.ok(emailVerify.verifyOtp(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest request) {
        logger.debug("Request is reached");
        try {

            AuthResponse response = loginTokenService.authenticate(request);
            return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(response);
            
        } catch (Exception e) {
            logger.debug("Error enclounter in authenticating "+e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in authenticating : "+e.getMessage());
        }
    }

}
