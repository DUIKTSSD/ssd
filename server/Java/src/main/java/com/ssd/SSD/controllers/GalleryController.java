package com.ssd.SSD.controllers;

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
    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addMeme(@RequestParam("file") MultipartFile file) throws IOException {

        String author = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(galleryService.add(file, userService.findByUsername(author)));
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (username.equals(galleryService.getGalleryById(id).getAuthor().getUsername())) {
            galleryService.removeById(id);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not author this meme");
        }
        return ResponseEntity.ok("Meme deleted successful");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable Long id) {
        Gallery gallery = galleryService.getGalleryById(id);

        String base64Image = Base64.getEncoder().encodeToString(gallery.getImage());

        GalleryDTO galleryDTO = new GalleryDTO(base64Image, gallery.getAuthor() );
        return ResponseEntity.ok(galleryDTO);
    }


    @GetMapping()
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(galleryService.getAll());

    }


}
