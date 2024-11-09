package com.ssd.SSD.controllers;

import com.ssd.SSD.services.DocumentationService;
import com.ssd.SSD.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/document/admin")
public class AdminDocumentationController {
    private final DocumentationService documentationService;
    private final UserService userService;


    @PostMapping("/add")
    public ResponseEntity<?> addMeme(@RequestParam("file") MultipartFile file, @RequestParam("name")String name) throws IOException {

        String author = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(documentationService.add(file, userService.findByUsername(author), name));
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id) {
            documentationService.removeById(id);

        return ResponseEntity.ok("documentation deleted successful");
    }

}
