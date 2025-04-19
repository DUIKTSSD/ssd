package com.ssd.SSD.services;

import com.ssd.SSD.exception.DBNotFoundException;
import com.ssd.SSD.models.Announcement;
import com.ssd.SSD.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;

    @Transactional
    public Page<Announcement> getAnnouncementsInOrder(int pageNumber, int pageSize) {
        return announcementRepository.findAllByDateOfEventAfter(
                LocalDate.now()
                , PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC, "dateOfEvent"))
        );
    }

    @Transactional
    public Page<Announcement> getAll(int pageNumber, int pageSize) {
        return announcementRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }

    @Transactional
    public void addAnnouncement(Announcement announcement) {
        announcement.setCrated_at(LocalDate.now());
        announcementRepository.save(announcement);
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }

    @Transactional
    public Announcement getAnnouncement(Long id) {
        return announcementRepository.findById(id).orElseThrow(() -> new DBNotFoundException("Анонс за id: " + id + " не знайдено"));
    }
}
