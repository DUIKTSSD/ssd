package com.ssd.SSD.services;

import com.ssd.SSD.exception.DBNotFoundException;
import com.ssd.SSD.exception.LimitIsIncreased;
import com.ssd.SSD.models.Meme;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.MemesRepository;
import com.ssd.SSD.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class MemesService {
    private final MemesRepository memesRepository;
    private final UserRepository userRepository;

    private final static String MEME_NOT_FOUND = "Memes not found";


    @Transactional
    public void removeById(Long id){

        if(memesRepository.findById(id).isEmpty()){
            throw  new DBNotFoundException(MEME_NOT_FOUND);
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
//        Instant now = Instant.now();
//
//        Timestamp startDate = Timestamp.from(now.minus(1, ChronoUnit.WEEKS));
//        Timestamp endDate = Timestamp.from(now);
//
//        if(memesRepository.countByCreatedAtBetween(startDate, endDate)>5){
//             throw new LimitIsIncreased("Ви досягли максимальної кількості опублікованих мемів на тиждень (5)");
//        }

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
        return memesRepository.findById(id).orElseThrow(() -> new DBNotFoundException(MEME_NOT_FOUND));
    }
    @Transactional

    public Meme getMemeByIdIsLegal(Long id){
        return memesRepository.findByIdAndIsLegalTrue(id).orElseThrow(() -> new DBNotFoundException(MEME_NOT_FOUND));

    }
    @Transactional

    public Page<Meme> getAllIsLegal(int pageNumber, int pageSize) {
        return memesRepository.findByIsLegalTrue(PageRequest.of(pageNumber, pageSize));
    }

    @Transactional
    public Page<Meme> getAllIsNullLegal(int pageNumber, int pageSize) {
        return memesRepository.findByIsLegalNull(PageRequest.of(pageNumber, pageSize));
    }

    @Transactional
    public Meme setLegalStatus(Long id , Boolean isLegal){
        Meme meme = memesRepository.findById(id).orElseThrow(() -> new DBNotFoundException(MEME_NOT_FOUND));
        meme.setIsLegal(isLegal);

        memesRepository.save(meme);

        return meme;
    }
}
