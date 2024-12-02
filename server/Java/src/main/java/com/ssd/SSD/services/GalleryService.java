package com.ssd.SSD.services;

import com.ssd.SSD.exception.DBNotFoundException;
import com.ssd.SSD.models.Gallery;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.GalleryRepository;
import com.ssd.SSD.repository.UserRepository;
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
        return galleryRepository.findById(id).orElseThrow(() -> new DBNotFoundException("Gallery not found"));
    }

    public Page<Gallery> getAll(int pageNumber, int pageSize) {
        return galleryRepository.findAll(PageRequest.of(pageNumber,pageSize));
    }
}
