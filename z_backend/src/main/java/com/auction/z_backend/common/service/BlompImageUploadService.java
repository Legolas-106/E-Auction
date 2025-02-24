package com.auction.z_backend.common.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;

import org.openstack4j.api.OSClient;
import org.openstack4j.api.exceptions.AuthenticationException;
import org.openstack4j.model.common.Payloads;
import org.openstack4j.model.storage.object.SwiftContainer;
import org.openstack4j.model.storage.object.SwiftObject;
import org.openstack4j.openstack.OSFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;


@Service
public class BlompImageUploadService {
    
    @Value("${openstack.auth.url}")
    private String authUrl;

    @Value("${openstack.username}")
    private String username;

    @Value("${openstack.password}")
    private String password;

    @Value("${openstack.container}")
    private String bucketName;

    @Value("${openstack.image.directory}")
    private String imageDirectory;

    private static final long MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

    private OSClient.OSClientV3 authenticate() {
        try {
            return OSFactory.builderV3()
                    .endpoint(authUrl)
                    .credentials(username, password)
                    .authenticate();
        } catch (AuthenticationException e) {
            throw new RuntimeException("Failed to authenticate with Blomp", e);
        }
    }

    public String uploadImage(MultipartFile file) throws IOException {
        OSClient.OSClientV3 os = authenticate();
        String fileName = imageDirectory + "/" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        
        InputStream imageStream = (file.getSize() > MAX_IMAGE_SIZE) ? compressImage(file) : file.getInputStream();

        // Upload the image
        os.objectStorage().objects().put(bucketName, fileName, Payloads.create(imageStream));

        // Get the public URL
        String containerUrl = getContainerPublicUrl(os, bucketName);

        // Construct public image URL
        return containerUrl + "/" + fileName;
    }

    private InputStream compressImage(MultipartFile file) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());

        // Compress image (Reduce quality to 70%)
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Thumbnails.of(originalImage)
                  .scale(1)  // Keep original size
                  .outputQuality(0.7) // Reduce quality to 70%
                  .toOutputStream(outputStream);

        return new ByteArrayInputStream(outputStream.toByteArray());
    }

    public String getImageUrl(String imageName) {
        return "https://storage.blomp.com/v1/AUTH_/" + bucketName + "/" + imageDirectory + "/" + imageName;
    }
    private String getContainerPublicUrl(OSClient.OSClientV3 os, String bucketName) {
        return os.getEndpoint() + "/v1/AUTH_" + os.getToken().getProject().getId() + "/" + bucketName;
    }
    

}
