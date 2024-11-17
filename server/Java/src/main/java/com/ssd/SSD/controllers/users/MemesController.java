package com.ssd.SSD.controllers.users;

import com.ssd.SSD.DTO.MemeDTO;
import com.ssd.SSD.models.Meme;
import com.ssd.SSD.services.MemesService;
import com.ssd.SSD.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.Base64;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/memes")
public class MemesController {

    private final MemesService memesService;
    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addMeme(@RequestParam("file") MultipartFile file) throws IOException {

        long maxFileSize = 3 * 1024 * 1024; // 3MB

        if (file.getSize() > maxFileSize) {
            return ResponseEntity.badRequest().body("File is too large. Maximum size allowed is 3MB.");
        }

        String author = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(memesService.add(file, userService.findByUsername(author)));
    }


    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (username.equals(memesService.getMemeById(id).getAuthor().getUsername())) {
            memesService.removeById(id);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not author this meme");
        }
        return ResponseEntity.ok("Meme deleted successful");
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<?> getById(@PathVariable Long id) {
//        return ResponseEntity.ok(memesService.getMemeById(id).getImage());
//    }


    @GetMapping("/{id}")
    public ResponseEntity<MemeDTO> getImage(@PathVariable Long id) {
        Meme meme = memesService.getMemeByIdIsLegal(id);

        String base64Image = Base64.getEncoder().encodeToString(meme.getImage());

        MemeDTO memeDTO = new MemeDTO(base64Image, meme.getAuthor() );
        return ResponseEntity.ok(memeDTO);
    }


    @GetMapping()
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer pageNumber,@RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(memesService.getAllIsLegal(pageNumber, pageSize));

    }


}
