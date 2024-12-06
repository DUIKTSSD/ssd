package com.ssd.SSD.controllers.users;

import com.ssd.SSD.DTO.NewsDTO;
import com.ssd.SSD.models.News;
import com.ssd.SSD.models.NewsImage;
import com.ssd.SSD.services.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable Long id) {
        News news = newsService.getById(id);

        List<String> base64Image = news.getImages().stream().map(newsImage -> Base64.getEncoder().encodeToString(newsImage.getImage()) ).toList();

        NewsDTO newsDTO = new NewsDTO(base64Image, news.getTitle(), news.getText() ,news.getAuthor() , news.getCreatedAt());
        return ResponseEntity.ok(newsDTO);
    }

    @GetMapping()
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer pageNumber,@RequestParam(defaultValue = "10") Integer pageSize) {
        Page<News> newsPage = newsService.getAll(pageNumber, pageSize);

        Page<News> retNewsPage = newsPage.map(news -> new News(
                news.getId(),
                news.getImages().stream().map(newsImage ->
                        new NewsImage(newsImage.getId(),null, newsImage.getImage())
                ).toList(),
                news.getText(),
                news.getTitle(),
                news.getAuthor(),
                news.getCreatedAt()));

        return ResponseEntity.ok(retNewsPage);

    }
}
