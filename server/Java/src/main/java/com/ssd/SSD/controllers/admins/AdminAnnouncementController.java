package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.models.Announcement;
import com.ssd.SSD.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/announcement/admin")
public class AdminAnnouncementController {
    private final AnnouncementService announcementService;

    @PostMapping("/add")
    public ResponseEntity<?> addAnnouncement(
            @RequestParam("title") String title
            , @RequestParam("description") String description
            , @RequestParam("dateOfEvent")  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfEvent
            , @RequestParam("image") MultipartFile image
    ) throws IOException {

        announcementService.addAnnouncement(Announcement.builder()
                .title(title)
                .description(description)
                .dateOfEvent(dateOfEvent)
                .image(image.getBytes())
                .build());

        return ResponseEntity.ok("created successfully");
    }

    @DeleteMapping("/del/{id:\\d+}")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable(required = true) Long id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.ok("deleted successfully");
    }
}
