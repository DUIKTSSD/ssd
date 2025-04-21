package com.ssd.SSD.models;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vacances")
@Builder
public class Vacancy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private String title;
    private String salary;
    @Lob
    private String company;
    private String location;
    @Lob
    private String typeOfEmployment;
    @Lob
    private String description;
    private String urlJob;
}
