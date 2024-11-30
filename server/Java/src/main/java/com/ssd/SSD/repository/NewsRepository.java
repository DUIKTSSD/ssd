package com.ssd.SSD.repository;

import com.ssd.SSD.models.Meme;
import com.ssd.SSD.models.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NewsRepository extends JpaRepository<News, Long> {

    public void removeById(Long id);

//    @Query("SELECT n FROM News n JOIN FETCH n.images JOIN FETCH n.author") OR
    @EntityGraph(attributePaths = {"images", "author"})
    @Query("SELECT n FROM News n")
    Page<News> findAllWithImagesAndAuthor(Pageable pageable);

}
