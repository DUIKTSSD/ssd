package com.ssd.SSD.services;

import com.ssd.SSD.DTO.UsefulLinkDTO;
import com.ssd.SSD.exception.DBNotFoundException;
import com.ssd.SSD.models.Documentation;
import com.ssd.SSD.models.UsefulLink;
import com.ssd.SSD.repository.UsefulLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@RequiredArgsConstructor
public class UsefulLinkService {
    private final UsefulLinkRepository usefulLinkRepository;

    public Page<UsefulLink> getAll(int pageNumber, int pageSize){
        return usefulLinkRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }

    public UsefulLink getById(Long id) {
        return usefulLinkRepository.findById(id).orElseThrow(() -> new DBNotFoundException("корисної силки за id: " + id + " не знойдено"));
    }

    public void save(UsefulLinkDTO usefulLinkDTO) {
        usefulLinkRepository.save(new UsefulLink(null, usefulLinkDTO.getUrl(), usefulLinkDTO.getDescription()));
    }

    public void deleteById(long id) {
        usefulLinkRepository.deleteById(id);
    }
}
