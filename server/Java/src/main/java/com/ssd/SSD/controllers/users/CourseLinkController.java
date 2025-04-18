package com.ssd.SSD.controllers.users;

import com.ssd.SSD.services.CourseLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/course-link")

public class CourseLinkController {
    private final CourseLinkService courseLinkService;

    @GetMapping
    public ResponseEntity<?> getAllUsefulLink(
            @RequestParam(defaultValue = "0") Integer pageNumber
            , @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        return ResponseEntity.ok(courseLinkService.getAll(pageNumber, pageSize));
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<?> getUsefulLinkById(@PathVariable Long id) {
        return ResponseEntity.ok(courseLinkService.getById(id));
    }
}
