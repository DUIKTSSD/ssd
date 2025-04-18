package com.ssd.SSD.repository;

import com.ssd.SSD.models.UsefulLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsefulLinkRepository extends JpaRepository<UsefulLink, Long> {
}
