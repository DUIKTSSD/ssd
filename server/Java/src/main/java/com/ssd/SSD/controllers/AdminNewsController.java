package com.ssd.SSD.controllers;

import com.ssd.SSD.services.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news/admin")
public class AdminNewsController {

    private final NewsService newsService;

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id){
        newsService.removeById(id);
        return ResponseEntity.ok("news deleted successful");
    }
}
