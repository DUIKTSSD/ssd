package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.models.News;
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
    public ResponseEntity<?> addNews(@RequestParam("files") List<MultipartFile> files, @RequestParam("text") String text, @RequestParam("title") String title) throws IOException {

        String author = SecurityContextHolder.getContext().getAuthentication().getName();

        News added = newsService.add(files, userService.findByUsername(author), text, title);

        return ResponseEntity.ok("News added successful. Him id is " + added.getId());
    }
}
