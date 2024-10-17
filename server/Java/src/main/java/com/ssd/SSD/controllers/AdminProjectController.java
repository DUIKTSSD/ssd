package com.ssd.SSD.controllers;

import com.ssd.SSD.services.ProjectService;
import com.ssd.SSD.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects/admin")
@RequiredArgsConstructor
public class AdminProjectController {
    private final ProjectService projectService;

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id){
        if (projectService.removeById(id)){
            return ResponseEntity.ok("Project delete successful");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Щось пішло не так підчас збереження");
        }
    }

    @PostMapping("/close/{id}")
    public ResponseEntity<?> closeTheProject(@PathVariable Long id){
        return ResponseEntity.ok( projectService.closeProject(id));
    }

    @PostMapping("/setislegal/{id}")
    public ResponseEntity<?> setIsLegalStatus(@PathVariable Long id,@RequestParam Boolean isLegal) {
        projectService.setLegalStatus(id, isLegal);
        return ResponseEntity.ok().body("Status set successful: " + isLegal);
    }

    @GetMapping("/toinspection")
    public ResponseEntity<?> getProjectsToInspection() {
        return ResponseEntity.ok(projectService.getAllIsNullLegal());
    }
}
