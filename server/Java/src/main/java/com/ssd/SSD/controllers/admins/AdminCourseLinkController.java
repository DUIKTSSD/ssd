package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.DTO.CourseLinkDTO;
import com.ssd.SSD.DTO.UsefulLinkDTO;
import com.ssd.SSD.models.CourseLink;
import com.ssd.SSD.services.CourseLinkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/course-link/admin")
@RequiredArgsConstructor
public class AdminCourseLinkController {
    private final CourseLinkService courseLinkService;

    @PostMapping("/add")
    public ResponseEntity<?> create(@Valid @RequestBody CourseLinkDTO courseLinkDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(bindingResult.getFieldErrors().stream()
                            .map(DefaultMessageSourceResolvable::getDefaultMessage)
                            .toList());
        }
        courseLinkService.save(courseLinkDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("del/{id:\\d+}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        courseLinkService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
