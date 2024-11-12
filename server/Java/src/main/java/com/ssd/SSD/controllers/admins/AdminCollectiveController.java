package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.DTO.CollectiveDTO;
import com.ssd.SSD.models.Collective;
import com.ssd.SSD.services.CollectiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collective/admin")
public class AdminCollectiveController {
    private final CollectiveService collectiveService;

    @PostMapping("/add")
    public ResponseEntity<?> create(@RequestParam("image") MultipartFile image, @ModelAttribute CollectiveDTO collectiveDTO) throws IOException {

        return ResponseEntity.ok(collectiveService.save(collectiveDTO, image));
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        collectiveService.remove(id);
        return ResponseEntity.ok("deleted successful");
    }
}
