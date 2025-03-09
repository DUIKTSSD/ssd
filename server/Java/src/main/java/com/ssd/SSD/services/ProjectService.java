package com.ssd.SSD.services;

import com.ssd.SSD.exception.DBNotFoundException;
import com.ssd.SSD.models.Project;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.ProjectsRepository;
import com.ssd.SSD.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectsRepository projectsRepository;
    private final UserRepository userRepository;

    private final static String PROJECT_NOT_FOUND = "Project not found";

    public  List<Project> getAll() {
        return projectsRepository.findAll();
    }

    @Transactional
    public Page<Project> getAllByPage(int pageNumber, int pageSize) {
        return projectsRepository.findAll(PageRequest.of(pageNumber,pageSize));
    }

    @Transactional
    public Project save(Project project){
        project.setStatus(true);
//        project.setTeam(new ArrayList<>());
        projectsRepository.save(project);

        return project;
    }

    @Transactional
    public Project getProject(Long id) {
        return projectsRepository.findById(id).orElseThrow(() -> new DBNotFoundException(PROJECT_NOT_FOUND));
    }
    @Transactional
    public User getUserOfProject(Long projectId){
        return userRepository.findById(projectsRepository.findById(projectId).orElseThrow(() -> new DBNotFoundException(PROJECT_NOT_FOUND)).getId()).orElseThrow(() ->new UsernameNotFoundException("Користувача не знайдено"));
    }

    @Transactional
    public Project closeProject(Long id){
        Project project = projectsRepository.findById(id).orElseThrow(() -> new DBNotFoundException(PROJECT_NOT_FOUND));
        project.setStatus(false); //closed


            projectsRepository.save(project);

        return project;
    }

    @Transactional
    public boolean removeById(Long id){
        try {
            projectsRepository.removeById(id);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    @Transactional
    public Page<Project> getAllIsLegal(Integer pageNumber, Integer pageSize) {
        return projectsRepository.findByIsLegalTrue(PageRequest.of( pageNumber, pageSize));

    }

    @Transactional
    public Project setLegalStatus(Long id, Boolean isLegal) {
        Project project = projectsRepository.findById(id).orElseThrow(() -> new DBNotFoundException(PROJECT_NOT_FOUND));
        project.setIsLegal(isLegal);

        projectsRepository.save(project);

        return project;

    }
@Transactional
    public Page<Project> getAllIsNullLegal(int pageNumber, int pageSize) {
        return projectsRepository.findByIsLegalNull(PageRequest.of(pageNumber, pageSize));
    }
}
