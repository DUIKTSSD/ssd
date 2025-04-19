package com.ssd.SSD.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "announcements")
@Builder
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private String title;
    @Lob
    private String description;

    @Lob
    private byte[] image;

    private LocalDate dateOfEvent;

    private LocalDate crated_at;
}
