package com.ssd.SSD.services;

import com.ssd.SSD.exception.ProjectNotFoundException;
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
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectsRepository projectsRepository;
    private final UserRepository userRepository;

    public  List<Project> getAll() {
        return projectsRepository.findAll();
    }

    public Page<Project> getAllByPage(int pageNumber, int pageSize) {
        return projectsRepository.findAll(PageRequest.of(pageNumber,pageSize));
    }


    public Project save(Project project){
        project.setStatus(true);
//        project.setTeam(new ArrayList<>());
        projectsRepository.save(project);

        return project;
    }


    public Project getProject(Long id) {
        return projectsRepository.findById(id).orElseThrow(ProjectNotFoundException::new);
    }

    public User getUserOfProject(Long projectId){
        return userRepository.findById(projectsRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new).getId()).orElseThrow(() ->new UsernameNotFoundException("Користувача не знайдено"));
    }

    @Transactional
    public Project closeProject(Long id){
        Project project = projectsRepository.findById(id).orElseThrow(ProjectNotFoundException::new);
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
        Project project = projectsRepository.findById(id).orElseThrow(ProjectNotFoundException::new);
        project.setIsLegal(isLegal);

        projectsRepository.save(project);

        return project;

    }

    public Page<Project> getAllIsNullLegal(int pageNumber, int pageSize) {
        return projectsRepository.findByIsLegalNull(PageRequest.of(pageNumber, pageSize));
    }
}
