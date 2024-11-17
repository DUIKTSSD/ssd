package com.ssd.SSD.services;

import com.ssd.SSD.exception.DocumentationNotFoundException;
import com.ssd.SSD.models.Documentation;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.DocumentationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class DocumentationService {
    private final DocumentationRepository documentationRepository;

    @Transactional
    public void removeById(Long id){

        if(documentationRepository.findById(id).isEmpty()){
            throw new DocumentationNotFoundException();
        }
        else {
            documentationRepository.removeById(id);
        }

    }

    @Transactional
    public Documentation add(MultipartFile file, User author, String name) throws IOException {
        Documentation document = new Documentation();
        document.setAuthor(author);
        document.setFile(file.getBytes());
        document.setName(name);
        document.setCreatedAt(new Date());

        documentationRepository.save(document);

        return document;
    }

    public Documentation getById(Long id) {
        return documentationRepository.findById(id).orElseThrow(DocumentationNotFoundException::new);
    }

    public Page<Documentation> getAll(int pageNumber, int pageSize) {
        return documentationRepository.findAll(PageRequest.of(pageNumber,pageSize));
    }
}
