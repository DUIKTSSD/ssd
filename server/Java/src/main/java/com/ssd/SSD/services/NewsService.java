package com.ssd.SSD.services;

import com.ssd.SSD.exception.MemesNotFoundException;
import com.ssd.SSD.exception.NewsNotFoundException;
import com.ssd.SSD.models.News;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.NewsRepository;
import com.ssd.SSD.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public void removeById(Long id) {

        if (newsRepository.findById(id).isEmpty()) {
            throw new MemesNotFoundException();
        } else {
            newsRepository.removeById(id);
        }

    }

    @Transactional
    public News add(List<MultipartFile> images, User author, String text, String title) throws IOException {
        News news = new News();
        news.setAuthor(author);
        news.setImage(images.stream().map(multipartFile -> {
            try {
                return multipartFile.getBytes();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList());
        news.setCreatedAt(new Date());
        news.setText(text);
        news.setTitle(title);

        newsRepository.save(news);

        return news;
    }

    public News getById(Long id) {
        return newsRepository.findById(id).orElseThrow(NewsNotFoundException::new);
    }

    public Page<News> getAll(Integer pageNumber, Integer pageSize) {
        return newsRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }
}
