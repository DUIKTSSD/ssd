package com.ssd.SSD.repository;

import com.ssd.SSD.models.Documentation;
import com.ssd.SSD.models.Meme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentationRepository extends JpaRepository<Documentation, Long> {

    public void removeById(Long id);
}
