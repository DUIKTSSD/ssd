package com.ssd.SSD.repository;

import com.ssd.SSD.models.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    public void removeById(Long id);
}
