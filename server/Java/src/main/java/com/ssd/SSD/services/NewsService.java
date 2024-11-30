package com.ssd.SSD.services;

import com.ssd.SSD.exception.MemesNotFoundException;
import com.ssd.SSD.exception.NewsNotFoundException;
import com.ssd.SSD.models.News;
import com.ssd.SSD.models.NewsImage;
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
    public News add(List<MultipartFile> images, User author, String text, String title) {
        News news = new News();
        news.setAuthor(author);
        news.setCreatedAt(new Date());
        news.setText(text);
        news.setTitle(title);

        // Створення списку зображень і додавання до новини
        List<NewsImage> newsImages = images.stream().map(multipartFile -> {
            try {
                NewsImage newsImage = new NewsImage();
                newsImage.setImage(multipartFile.getBytes());
                newsImage.setNews(news); // Встановлення зв'язку з News
                return newsImage;
            } catch (IOException e) {
                throw new RuntimeException("Помилка обробки файлу зображення", e);
            }
        }).toList();

        // Додати зображення до новини
        news.setImages(newsImages);

        // Зберегти новину разом із зображеннями
        return newsRepository.save(news);
    }


    public News getById(Long id) {
        return newsRepository.findById(id).orElseThrow(NewsNotFoundException::new);
    }

    @Transactional
    public Page<News> getAll(Integer pageNumber, Integer pageSize) {
        return newsRepository.findAllWithImagesAndAuthor(PageRequest.of(pageNumber, pageSize));
    }

}
