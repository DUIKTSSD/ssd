package com.ssd.SSD.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "documentation")
@Getter
@Setter
@NoArgsConstructor
public class Documentation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Lob
    @Column(nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private User author;

    private Date createdAt;

}
