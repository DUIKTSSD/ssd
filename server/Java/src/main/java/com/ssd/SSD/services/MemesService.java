package com.ssd.SSD.services;

import com.ssd.SSD.exception.MemesNotFoundException;
import com.ssd.SSD.models.Meme;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.MemesRepository;
import com.ssd.SSD.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemesService {
    private final MemesRepository memesRepository;
    private final UserRepository userRepository;


    @Transactional
    public void removeById(Long id){

        if(memesRepository.findById(id).isEmpty()){
            throw  new MemesNotFoundException();
        }
        else {
            memesRepository.removeById(id);
        }

    }

    @Transactional
    public Meme add(MultipartFile image, User author) throws IOException {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        if (!isValidImageFormat(image.getContentType())) {
            throw new IllegalArgumentException("Invalid file format");
        }
        Meme meme = new Meme();
        meme.setAuthor(author);
        meme.setImage(image.getBytes());
        meme.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return memesRepository.save(meme);
    }

    private boolean isValidImageFormat(String contentType) {
        return Arrays.asList("image/jpeg", "image/png", "image/gif").contains(contentType);
    }

    public Meme getMemeById(Long id) {
        return memesRepository.findById(id).orElseThrow(MemesNotFoundException::new);
    }

    public Meme getMemeByIdIsLegal(Long id){
        return memesRepository.findByIdAndIsLegalTrue(id).orElseThrow(MemesNotFoundException::new);

    }

    @Transactional
    public List<Meme> getAllIsLegal() {
        return memesRepository.findByIsLegalTrue();
//        EntityManager em = entityManagerFactory.createEntityManager();
//        em.getTransaction().begin(); // Почати транзакцію
//          // робота з LOB (вставка/отримання зображень)
//        em.getTransaction().commit(); // Завершити транзакцію
//        em.close();
    }

    @Transactional
    public List<Meme> getAllIsNullLegal() {
        return memesRepository.findByIsLegalNull();
    }

    @Transactional
    public Meme setLegalStatus(Long id , Boolean isLegal){
        Meme meme = memesRepository.findById(id).orElseThrow(() -> new MemesNotFoundException());
        meme.setIsLegal(isLegal);

        memesRepository.save(meme);

        return meme;
    }
}
