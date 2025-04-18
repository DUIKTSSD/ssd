package com.ssd.SSD.controllers.users;

import com.ssd.SSD.models.UsefulLink;
import com.ssd.SSD.services.UsefulLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/useful-link")

public class UsefulLinkController {
    private final UsefulLinkService usefulLinkService;

    @GetMapping
    public ResponseEntity<?> getAllUsefulLink(
            @RequestParam(defaultValue = "0") Integer pageNumber
            , @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        return ResponseEntity.ok(usefulLinkService.getAll(pageNumber, pageSize));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsefulLinkById(@PathVariable Long id) {
        return ResponseEntity.ok(usefulLinkService.getById(id));
    }
}
