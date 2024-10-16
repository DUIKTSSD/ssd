package com.ssd.SSD.controllers;

import com.ssd.SSD.DTO.DocumentationDTO;
import com.ssd.SSD.models.Documentation;
import com.ssd.SSD.services.DocumentationService;
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
@RequestMapping("/api/document")
public class DocumentaionController {

    private final DocumentationService documentationService;
    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addMeme(@RequestParam("file") MultipartFile file,@RequestParam("name")String name) throws IOException {

        String author = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(documentationService.add(file, userService.findByUsername(author), name));
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (username.equals(documentationService.getById(id).getAuthor().getUsername())) {
            documentationService.removeById(id);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not author this meme");
        }
        return ResponseEntity.ok("Meme deleted successful");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(documentationService.getById(id));
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<?> getImage(@PathVariable Long id) {
//        Documentation d = documentationService.getById(id);
//
//        String base64File = Base64.getEncoder().encodeToString(d.getFile());
//
//        DocumentationDTO documentationDTO = new DocumentationDTO(d.getId(), d.getName(),base64File, d.getAuthor(),d.getCreatedAt() );
//
//        return ResponseEntity.ok(documentationDTO);
//    }


    @GetMapping()
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(documentationService.getAll());

    }


}
