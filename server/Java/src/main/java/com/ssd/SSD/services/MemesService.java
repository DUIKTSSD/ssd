package com.ssd.SSD.services;

import com.ssd.SSD.exception.MemesNotFoundException;
import com.ssd.SSD.models.Meme;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.MemesRepository;
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
        Meme meme = new Meme();
        meme.setAuthor(author);
        meme.setImage(image.getBytes());
        meme.setCreatedAt(new Date());

        memesRepository.save(meme);

        return meme;
    }

    public Meme getMemeById(Long id) {
        return memesRepository.findById(id).orElseThrow(MemesNotFoundException::new);
    }

    public List<Meme> getAll() {
        return memesRepository.findAll();
    }
}
