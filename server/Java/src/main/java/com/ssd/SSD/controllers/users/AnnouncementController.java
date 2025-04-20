package com.ssd.SSD.controllers.users;

import com.ssd.SSD.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/announcement")
public class AnnouncementController {
    private final AnnouncementService announcementService;

    @GetMapping("/in-order")
    public ResponseEntity<?> getAnnouncementInOrder(
            @RequestParam(defaultValue = "0") Integer pageNumber
            , @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        return ResponseEntity.ok(announcementService.getAnnouncementsInOrder(pageNumber, pageSize));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllAnnouncements(
            @RequestParam(defaultValue = "0") Integer pageNumber
            , @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        return ResponseEntity.ok(announcementService.getAll(pageNumber, pageSize));
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<?> getAnnouncementById(@PathVariable(required = true) Long id) {
        return ResponseEntity.ok(announcementService.getAnnouncement(id));
    }


}
