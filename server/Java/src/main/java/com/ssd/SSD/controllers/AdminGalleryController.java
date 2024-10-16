package com.ssd.SSD.controllers;

import com.ssd.SSD.services.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gallery/admin")
public class AdminGalleryController {

    private final GalleryService galleryService;

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id){
        galleryService.removeById(id);
        return ResponseEntity.ok("Gallery deleted successful");
    }
}
