package com.ssd.SSD.services;

import com.ssd.SSD.models.Project;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectFilterService {

    /**
     * Filters projects based on the provided criteria, allowing partial matches.
     *
     * @param projects            - List of projects to filter
     * @param title               - Filter by project title (optional, partial match)
     * @param leaderUsername      - Filter by leader's username (optional, partial match)
     * @param technologyStack     - Filter by technology stack (optional, partial match)
     * @param mainText            - Filter by main text (optional, partial match)
     * @param status              - Filter by project status (optional)
     * @return - Filtered list of projects
     */
    public List<Project> filterProjects(List<Project> projects, String title, String leaderUsername, String technologyStack, String mainText, Boolean status) {
        return projects.stream()
                .filter(project -> (title == null || containsIgnoreCase(project.getTitle(), title)))
                .filter(project -> (leaderUsername == null || containsIgnoreCase(project.getLeader().getUsername(), leaderUsername)))
                .filter(project -> (technologyStack == null || containsIgnoreCase(project.getTechnologyStack(), technologyStack)))
                .filter(project -> (mainText == null || containsIgnoreCase(project.getMainText(), mainText)))
                .filter(project -> (status == null || project.getStatus().equals(status)))
                .collect(Collectors.toList());
    }

    // Helper method to check for case-insensitive partial matches
    private boolean containsIgnoreCase(String source, String target) {
        return source != null && source.toLowerCase().contains(target.toLowerCase());
    }
}
