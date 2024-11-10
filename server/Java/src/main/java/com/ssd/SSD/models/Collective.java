package com.ssd.SSD.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Collective {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String DuiktGroup;
    @Lob
    @Column(nullable = false)
    private byte[] image;

    @Column(nullable = false)
    private String specialty;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String inFact;

    @Column(nullable = false)
    private String team; //if null they Голови відділу
}
