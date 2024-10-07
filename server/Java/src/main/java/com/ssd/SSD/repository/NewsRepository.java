package com.ssd.SSD.repository;

import com.ssd.SSD.models.Meme;
import com.ssd.SSD.models.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {

    public void removeById(Long id);
}
