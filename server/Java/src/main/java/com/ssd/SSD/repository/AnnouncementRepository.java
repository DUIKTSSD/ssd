package com.ssd.SSD.repository;

import com.ssd.SSD.models.Announcement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    Page<Announcement> findAllByDateOfEventAfter(LocalDate dateOfEventAfter, Pageable pageable);
}
