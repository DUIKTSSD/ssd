package com.ssd.SSD.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "news")
@Getter
@Setter
@NoArgsConstructor
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(name = "news_images", joinColumns = @JoinColumn(name = "news_id"))
    @Column(name = "image")
    private List<byte[]> images;  // Поле для зберігання масиву зображень

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private User author;

    private Date createdAt;

    public void setImage(List<byte[]> list) {
        this.images =list;
    }

}
