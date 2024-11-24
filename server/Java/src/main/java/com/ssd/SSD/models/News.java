package com.ssd.SSD.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "news")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ElementCollection
//    @CollectionTable(name = "news_images", joinColumns = @JoinColumn(name = "news_id"))
//    @Column(name = "image")
//    private List<byte[]> images;  // Поле для зберігання масиву зображень

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<NewsImage> images = new ArrayList<>();


    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private User author;

    private Date createdAt;


}
