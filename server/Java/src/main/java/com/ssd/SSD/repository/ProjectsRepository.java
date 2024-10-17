package com.ssd.SSD.repository;

import com.ssd.SSD.models.Meme;
import com.ssd.SSD.models.Project;
import com.ssd.SSD.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectsRepository extends JpaRepository<Project, Long> {

    void removeById(Long id);

    List<Project> findByIsLegalTrue();

    @Query("SELECT m FROM Project m WHERE m.isLegal IS NULL")
    List<Project> findByIsLegalNull();
}
