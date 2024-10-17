package com.ssd.SSD.controllers;

import com.ssd.SSD.DTO.MemeDTO;
import com.ssd.SSD.DTO.NewsDTO;
import com.ssd.SSD.models.News;
import com.ssd.SSD.services.NewsService;
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
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable Long id) {
        News news = newsService.getById(id);

        String base64Image = Base64.getEncoder().encodeToString(news.getImage());

        NewsDTO newsDTO = new NewsDTO(base64Image, news.getText() ,news.getAuthor() , news.getCreatedAt());
        return ResponseEntity.ok(newsDTO);
    }

    @GetMapping()
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(newsService.getAll());

    }
}
