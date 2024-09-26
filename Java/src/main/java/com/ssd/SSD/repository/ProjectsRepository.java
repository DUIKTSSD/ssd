package com.ssd.SSD.repository;

import com.ssd.SSD.models.Project;
import com.ssd.SSD.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectsRepository extends JpaRepository<Project, Long> {

    void removeById(Long id);
}
