package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.DTO.UsefulLinkDTO;
import com.ssd.SSD.services.UsefulLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/useful-link/admin")
@RequiredArgsConstructor
public class AdminUsefulLinkController {
    private final UsefulLinkService usefulLinkService;

    @PostMapping("/add")
    public ResponseEntity<?> create(@RequestBody UsefulLinkDTO usefulLinkDTO) {
        usefulLinkService.save(usefulLinkDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("del/{id:\\d+}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        usefulLinkService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
