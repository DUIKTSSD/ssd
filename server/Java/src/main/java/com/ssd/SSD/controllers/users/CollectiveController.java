package com.ssd.SSD.controllers.users;

import com.ssd.SSD.services.CollectiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collective")
public class CollectiveController {
    private final CollectiveService collectiveService;

    @GetMapping()
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(collectiveService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(collectiveService.getById(id));
    }
}
