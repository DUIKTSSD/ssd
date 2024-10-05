package com.ssd.SSD.repository;

import com.ssd.SSD.models.Meme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemesRepository extends JpaRepository<Meme, Long> {

    public void removeById(Long id);
}
