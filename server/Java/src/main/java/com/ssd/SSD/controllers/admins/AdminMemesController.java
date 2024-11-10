package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.models.Meme;
import com.ssd.SSD.services.MemesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/memes/admin")
public class AdminMemesController {

    private final MemesService memesService;

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id) {
        memesService.removeById(id);
        return ResponseEntity.ok("Meme deleted successful");
    }

    @PostMapping("/setislegal/{id}")
    public ResponseEntity<?> setIsLegalStatus(@PathVariable Long id,@RequestParam Boolean isLegal) {
        memesService.setLegalStatus(id, isLegal);
        return ResponseEntity.ok().body("Status set successful: " + isLegal);
    }

    @GetMapping("/memetoinspection")
    public ResponseEntity<?> getMemeToInspection() {
        return ResponseEntity.ok(memesService.getAllIsNullLegal());
    }
}
