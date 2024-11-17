package com.ssd.SSD.repository;

import com.ssd.SSD.models.Meme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemesRepository extends JpaRepository<Meme, Long> {

    public void removeById(Long id);

    Page<Meme> findByIsLegalTrue(PageRequest pageRequest);

    Optional<Meme> findByIdAndIsLegalTrue(Long id);

    @Query("SELECT m FROM Meme m WHERE m.isLegal IS NULL")
    Page<Meme> findByIsLegalNull(PageRequest pageRequest);
}
