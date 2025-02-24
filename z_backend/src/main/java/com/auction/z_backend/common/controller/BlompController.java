package com.auction.z_backend.common.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.auction.z_backend.common.service.BlompImageUploadService;

@RestController
@RequestMapping("/api/public")
public class BlompController {

    private final BlompImageUploadService blompStorageService;

    public BlompController(BlompImageUploadService blompStorageService) {
        this.blompStorageService = blompStorageService;
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = blompStorageService.uploadImage(file);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/getImage/{imageName}")
    public ResponseEntity<String> getImageUrl(@PathVariable String imageName) {
        return ResponseEntity.ok(blompStorageService.getImageUrl(imageName));
    }
}
