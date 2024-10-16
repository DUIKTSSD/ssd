package com.ssd.SSD.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "Memes")
@Getter
@Setter
@NoArgsConstructor
public class Meme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(nullable = false)//columnDefinition="LONGBLOB"
    private byte[] image;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private User author;

    private Boolean isLegal;

    private Timestamp createdAt;

}
