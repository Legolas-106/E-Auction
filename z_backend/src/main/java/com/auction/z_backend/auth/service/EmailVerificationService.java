package com.auction.z_backend.auth.service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.auction.z_backend.auth.dto.request.OtpVerificationRequest;
import com.auction.z_backend.auth.dto.response.EmailVerificationOtpResponse;
import com.auction.z_backend.auth.dto.response.OtpVerificationResponse;

@Service
public class EmailVerificationService {
    private final JavaMailSender mailSender;
    private final StringRedisTemplate redisTemplate;
    private static final int OTP_VALIDITY_MINUTES = 5;
    private static final int OTP_REQUEST_LIMIT = 4;
    private static final int OTP_REQUEST_INTERVAL = 1; // 1-minute delay before requesting again

    public EmailVerificationService(JavaMailSender mailSender, StringRedisTemplate redisTemplate) {
        this.mailSender = mailSender;
        this.redisTemplate = redisTemplate;
    }

    public EmailVerificationOtpResponse generateOtp(String email) {
        System.err.println("Generating OTP for email "+email);

        // Check if OTP was requested within the last 1 minute
        if (redisTemplate.hasKey("otp_timer:" + email)) {
            return new EmailVerificationOtpResponse(email, "Error", "Wait 1 minute before requesting a new OTP.");
        }

        // Check if the email has already requested OTP 4 times
        String requestCountKey = "otp_count:" + email;
        String count = redisTemplate.opsForValue().get(requestCountKey);
        int requestCount = (count != null) ? Integer.parseInt(count) : 0;

        if (requestCount >= OTP_REQUEST_LIMIT) {
            return new EmailVerificationOtpResponse(email, "Error", "Maximum OTP attempts reached. Try again later.");
        }

        // Generate OTP and send email
        String otp = generateRandomOtp();
        System.err.println("Generated OTP: " + otp + "\nNow Sending the mail");

        try {
            sendOtpEmail(email, otp);
        } catch (Exception e) {
            System.err.println("Error occurred while sending the mail: " + e.getMessage());
            return new EmailVerificationOtpResponse(email, "Error", e.getMessage());
        }

        System.err.println("Mail Sent");

        // Store OTP in Redis with expiration (5 minutes)
        redisTemplate.opsForValue().set("otp:" + email, otp, OTP_VALIDITY_MINUTES, TimeUnit.MINUTES);

        // Increment OTP request count (expires with OTP)
        redisTemplate.opsForValue().increment(requestCountKey);
        redisTemplate.expire(requestCountKey, OTP_VALIDITY_MINUTES, TimeUnit.MINUTES);

        // Set 1-minute request interval restriction
        redisTemplate.opsForValue().set("otp_timer:" + email, "LOCKED", OTP_REQUEST_INTERVAL, TimeUnit.MINUTES);

        return new EmailVerificationOtpResponse(email, "Generated", "OTP Generated Successfully");
    }

    public OtpVerificationResponse verifyOtp(OtpVerificationRequest request) {
        String storedOtp = redisTemplate.opsForValue().get("otp:" + request.getEmail());
        System.out.println("Received Otp is "+request.getOtp()+" And sended otp is "+storedOtp);
        if (storedOtp == null){
            return new OtpVerificationResponse(false,"Expired OTP");
        }
        if(!storedOtp.equals(request.getOtp())){
            return new OtpVerificationResponse(false,"Invalid OTP");
        }


        // Delete OTP after successful verification
        redisTemplate.delete("otp:" + request.getEmail());
        redisTemplate.delete("otp_count:" + request.getEmail()); // Reset OTP request count

        return new OtpVerificationResponse(true, "OTP Verified Successfully");
    }

    private String generateRandomOtp() {
        return String.format("%06d", new Random().nextInt(900000) + 100000);
    }

    private void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }
}