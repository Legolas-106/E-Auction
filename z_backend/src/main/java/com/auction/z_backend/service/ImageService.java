package com.auction.z_backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class ImageService {
    
    @Value("${upload.dir}")
    private String uploadDir;

    @Value("${auction.image.dir}")
    private String auctionImageDir;

    public String saveAuctionImage(String loginId, LocalDateTime creationTime,Long auctionId){
        Path sourceBasePath = Paths.get(uploadDir, "itemImages", loginId, creationTime.toString());
        Path targetBasePath = Paths.get(auctionImageDir, "auctionImages", auctionId.toString());

        try {
            if (!Files.exists(sourceBasePath)) {
                throw new RuntimeException("Source directory does not exist: " + sourceBasePath);
            }

            Files.createDirectories(targetBasePath);

            Files.walk(sourceBasePath)
                .filter(Files::isDirectory)
                .forEach(lotDir -> {
                    String lotNumber = lotDir.getFileName().toString();
                    Path targetLotPath = targetBasePath.resolve(lotNumber);

                    try {
                        Files.createDirectories(targetLotPath);

                        Files.walk(lotDir)
                            .filter(Files::isRegularFile)
                            .forEach(file -> {
                                try {
                                    Files.move(file, targetLotPath.resolve(file.getFileName()), StandardCopyOption.REPLACE_EXISTING);
                                } catch (IOException e) {
                                    throw new RuntimeException("Error moving file: " + file.getFileName(), e);
                                }
                            });

                    } catch (IOException e) {
                        throw new RuntimeException("Error creating lot directory: " + lotNumber, e);
                    }
                });

            return "Images moved successfully!";
        } catch (Exception e) {
            throw new RuntimeException("Exception while moving images: " + e.getMessage());
        }
    }

    public String saveImage(MultipartFile file,String loginId,LocalDateTime time,String lotNumber) throws IOException {
        
        Path path = Paths.get(uploadDir,"itemImages",loginId,time.toString(),lotNumber);
        try{
            Files.createDirectories(path);
    
            String fileName = file.getOriginalFilename();
            Path filePath = path.resolve(fileName);
            file.transferTo(filePath);
    
            return filePath.toString();
        }
        catch(Exception e){
            System.out.println("Exception While Saving the images to the Path : "+e.getMessage());
            throw new RuntimeException("Exception While Saving the images to the Path : "+e.getMessage());
        }
    }
}
