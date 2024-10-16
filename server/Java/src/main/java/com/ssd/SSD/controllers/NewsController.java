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
    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addNews(@RequestParam("file") MultipartFile file, @RequestParam("text") String text) throws IOException {

        String author = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(newsService.add(file, userService.findByUsername(author),text));
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheNews(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (username.equals(newsService.getById(id).getAuthor().getUsername())) {
            newsService.removeById(id);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not author this news");
        }
        return ResponseEntity.ok("News deleted successful");
    }




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
