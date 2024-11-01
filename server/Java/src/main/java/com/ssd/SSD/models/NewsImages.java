//package com.ssd.SSD.models;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Table(name = "NewsImages")
//@Getter
//@Setter
//@NoArgsConstructor
//public class NewsImages {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "news_id", referencedColumnName = "id", nullable = false)
//    private News news;  // Замість Long NewsId використовуємо News для зв'язку
//
//    @Lob
//    private byte[] image;
//}
//
