package com.ssd.SSD.controllers;

import com.ssd.SSD.services.GalleryService;
import com.ssd.SSD.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gallery/admin")
public class AdminGalleryController {

    private final GalleryService galleryService;
    private final UserService userService;

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteThePhoto(@PathVariable Long id){
        galleryService.removeById(id);
        return ResponseEntity.ok("Gallery deleted successful");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPhoto(@RequestParam("file") MultipartFile file) throws IOException {

        String author = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(galleryService.add(file, userService.findByUsername(author)));
    }
}
