package com.ssd.SSD.services;

import com.ssd.SSD.DTO.CourseLinkDTO;
import com.ssd.SSD.DTO.UsefulLinkDTO;
import com.ssd.SSD.exception.DBNotFoundException;
import com.ssd.SSD.models.CourseLink;
import com.ssd.SSD.models.UsefulLink;
import com.ssd.SSD.repository.CourseLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseLinkService {
    private final CourseLinkRepository courseLinkRepository;

    public Page<CourseLink> getAll(int pageNumber, int pageSize){
        return courseLinkRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }

    public CourseLink getById(Long id) {
        return courseLinkRepository.findById(id).orElseThrow(() -> new DBNotFoundException("курс за id: " + id + " не знойдено"));
    }

    public void save(CourseLinkDTO courseLinkDTO) {
        courseLinkRepository.save(new CourseLink(null, courseLinkDTO.getUrl(), courseLinkDTO.getDescription()));
    }

    public void deleteById(long id) {
        courseLinkRepository.deleteById(id);
    }
}
