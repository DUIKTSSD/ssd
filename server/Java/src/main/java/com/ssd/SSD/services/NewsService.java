package com.ssd.SSD.services;

import com.ssd.SSD.exception.MemesNotFoundException;
import com.ssd.SSD.exception.NewsNotFoundException;
import com.ssd.SSD.models.News;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.NewsRepository;
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
public class NewsService {
    private final NewsRepository newsRepository;
    private final UserRepository userRepository;


    @Transactional
    public void removeById(Long id){

        if(newsRepository.findById(id).isEmpty()){
            throw  new MemesNotFoundException();
        }
        else {
            newsRepository.removeById(id);
        }

    }

    @Transactional
    public News add(MultipartFile image, User author, String text) throws IOException {
        News news = new News();
        news.setAuthor(author);
        news.setImage(image.getBytes());
        news.setCreatedAt(new Date());
        news.setText(text);

        newsRepository.save(news);

        return news;
    }

    public News getById(Long id) {
        return newsRepository.findById(id).orElseThrow(NewsNotFoundException::new);
    }

    public List<News> getAll() {
        return newsRepository.findAll();
    }
}
