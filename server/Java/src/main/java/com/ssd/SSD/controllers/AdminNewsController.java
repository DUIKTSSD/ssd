package com.ssd.SSD.controllers;

import com.ssd.SSD.services.NewsService;
import com.ssd.SSD.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news/admin")
public class AdminNewsController {

    private final NewsService newsService;
    private final UserService userService;

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id){
        newsService.removeById(id);
        return ResponseEntity.ok("news deleted successful");
    }

    @PostMapping(path = "/add" )
    public ResponseEntity<?> addNews(@RequestParam("files") List<MultipartFile> files, @RequestParam("text") String text) throws IOException {

        String author = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(newsService.add(files, userService.findByUsername(author),text));
    }
}
