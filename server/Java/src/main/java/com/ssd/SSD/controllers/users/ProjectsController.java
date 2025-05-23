package com.ssd.SSD.controllers.users;

import com.ssd.SSD.DTO.ProjectDTO;
import com.ssd.SSD.models.Project;
import com.ssd.SSD.models.User;
import com.ssd.SSD.services.ProjectFilterService;
import com.ssd.SSD.services.ProjectService;
import com.ssd.SSD.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectsController {
    private final ProjectService projectService;
    private final UserService userService;
    private final ProjectFilterService projectFilterService;
    private final PolicyFactory policy = Sanitizers.FORMATTING;


    @PostMapping("/add")
    public ResponseEntity<?> createProject(@RequestBody @Valid ProjectDTO projectDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(bindingResult.getFieldErrors().stream()
                            .map(DefaultMessageSourceResolvable::getDefaultMessage)
                            .toList());
        }

        System.out.println(projectDTO.getTelegramProfile());
        projectDTO.setTitle( policy.sanitize(projectDTO.getTitle()));
        projectDTO.setMainText(policy.sanitize(projectDTO.getMainText()));
        projectDTO.setTechnologyStack(policy.sanitize(projectDTO.getTechnologyStack()));
        projectDTO.setPhoneNumber(policy.sanitize(projectDTO.getPhoneNumber()));
        projectDTO.setWishes(policy.sanitize(projectDTO.getWishes()));

        String sanitize = policy.sanitize(projectDTO.getTelegramProfile());

        projectDTO.setTelegramProfile(sanitize.replace("&#64;", "@"));

        System.out.println(projectDTO.getTelegramProfile());


        Project project = new Project(projectDTO);
        project.setLeader(userService.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));

        projectService.save(project);

        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> DeleteTheProject(@PathVariable Long id){
        String leaderName = SecurityContextHolder.getContext().getAuthentication().getName();
        if (leaderName.equals(projectService.getUserOfProject(id).getUsername()) ){

            if (projectService.removeById(id)){
                return ResponseEntity.ok("Project delete successful");
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body("Щось пішло не так підчас збереження");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(leaderName + " не являється лідером проєкта");
    }
    @PostMapping("/join/{id}")
    public ResponseEntity<?> joinToProject(@PathVariable Long id){
        // Find the project by ID
        Project project = projectService.getProject(id);
        if (project == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }

        // Get the currently authenticated user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        // Add user to the project's team (if not already in the team)
        if (!project.getTeam().contains(user)) {
            project.getTeam().add(user);
            projectService.save(project);  // Save updated project
            return ResponseEntity.ok("Successfully joined the project");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is already part of the project");
        }
    }

    @GetMapping()
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer pageNumber,@RequestParam(defaultValue = "10") Integer pageSize){
        return ResponseEntity.ok( projectService.getAllIsLegal(pageNumber,pageSize));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.ok(projectService.getProject(id));
    }

    @GetMapping("/filter")
    public List<Project> filterProjects(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String leaderUsername,
            @RequestParam(required = false) String technologyStack,
            @RequestParam(required = false) String mainText,
            @RequestParam(required = false) Boolean status) {

        List<Project> allProjects = projectService.getAll();
        return projectFilterService.filterProjects(allProjects, title, leaderUsername, technologyStack, mainText, status);
    }

    @PostMapping("/close/{id}")
    public ResponseEntity<?> closeTheProject(@PathVariable Long id){
        String leaderName = SecurityContextHolder.getContext().getAuthentication().getName();
        if (leaderName.equals(projectService.getUserOfProject(id).getUsername()) ){
            return ResponseEntity.ok( projectService.closeProject(id));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(leaderName + " не являється лідером проєкта");
    }
}
