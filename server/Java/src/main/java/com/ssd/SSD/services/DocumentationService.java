package com.ssd.SSD.services;

import com.ssd.SSD.exception.DocumentationNotFoundException;
import com.ssd.SSD.exception.MemesNotFoundException;
import com.ssd.SSD.models.Documentation;
import com.ssd.SSD.models.Meme;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.DocumentationRepository;
import com.ssd.SSD.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

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
    public Documentation add(MultipartFile file, User author) throws IOException {
        Documentation document = new Documentation();
        document.setAuthor(author);
//        document.setText(file.getBytes());
        document.setCreatedAt(new Date());

        documentationRepository.save(document);

        return document;
    }

    public Documentation getMemeById(Long id) {
        return documentationRepository.findById(id).orElseThrow(DocumentationNotFoundException::new);
    }

    public List<Documentation> getAll() {
        return documentationRepository.findAll();
    }
}
