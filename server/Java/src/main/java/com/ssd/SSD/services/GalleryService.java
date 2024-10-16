package com.ssd.SSD.services;

import com.ssd.SSD.exception.GalleryNotFoundException;
import com.ssd.SSD.exception.MemesNotFoundException;
import com.ssd.SSD.models.Gallery;
import com.ssd.SSD.models.Meme;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.GalleryRepository;
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
public class GalleryService {
    private final GalleryRepository galleryRepository;
    private final UserRepository userRepository;


    @Transactional
    public void removeById(Long id){

        if(galleryRepository.findById(id).isEmpty()){
            throw  new MemesNotFoundException();
        }
        else {
            galleryRepository.removeById(id);
        }

    }

    @Transactional
    public Gallery add(MultipartFile image, User author) throws IOException {
        Gallery gallery = new Gallery();
        gallery.setAuthor(author);
        gallery.setImage(image.getBytes());
        gallery.setCreatedAt(new Date());

        galleryRepository.save(gallery);

        return gallery;
    }

    public Gallery getGalleryById(Long id) {
        return galleryRepository.findById(id).orElseThrow(GalleryNotFoundException::new);
    }

    public List<Gallery> getAll() {
        return galleryRepository.findAll();
    }
}
