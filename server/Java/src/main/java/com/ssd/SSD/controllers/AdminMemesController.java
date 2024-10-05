package com.ssd.SSD.controllers;

import com.ssd.SSD.services.MemesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/memes/admin")
public class AdminMemesController {

    private final MemesService memesService;

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id){
        memesService.removeById(id);
        return ResponseEntity.ok("Meme deleted successful");
    }
}
