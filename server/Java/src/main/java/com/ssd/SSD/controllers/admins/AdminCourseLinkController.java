package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.DTO.CourseLinkDTO;
import com.ssd.SSD.DTO.UsefulLinkDTO;
import com.ssd.SSD.models.CourseLink;
import com.ssd.SSD.services.CourseLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/course-link/admin")
@RequiredArgsConstructor
public class AdminCourseLinkController {
    private final CourseLinkService courseLinkService;

    @PostMapping("/add")
    public ResponseEntity<?> create(@RequestBody CourseLinkDTO courseLinkDTO) {
        courseLinkService.save(courseLinkDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("del/{id:\\d+}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        courseLinkService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
