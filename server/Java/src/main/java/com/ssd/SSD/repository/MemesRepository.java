package com.ssd.SSD.repository;

import com.ssd.SSD.models.Meme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemesRepository extends JpaRepository<Meme, Long> {

    public void removeById(Long id);

    List<Meme> findByIsLegalTrue();

    Optional<Meme> findByIdAndIsLegalTrue(Long id);

    @Query("SELECT m FROM Meme m WHERE m.isLegal IS NULL")
    List<Meme> findByIsLegalNull();
}
