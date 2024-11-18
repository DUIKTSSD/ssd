package com.ssd.SSD.controllers.users;

import com.ssd.SSD.DTO.GalleryDTO;
import com.ssd.SSD.DTO.MemeDTO;
import com.ssd.SSD.models.Gallery;
import com.ssd.SSD.models.Meme;
import com.ssd.SSD.services.GalleryService;
import com.ssd.SSD.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable Long id) {
        Gallery gallery = galleryService.getGalleryById(id);

        String base64Image = Base64.getEncoder().encodeToString(gallery.getImage());

        GalleryDTO galleryDTO = new GalleryDTO(base64Image, gallery.getAuthor() );
        return ResponseEntity.ok(galleryDTO);
    }


    @GetMapping()
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer pageNumber,@RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(galleryService.getAll(pageNumber, pageSize));

    }


}
