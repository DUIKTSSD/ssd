package com.ssd.SSD.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String role;

//    @OneToMany(mappedBy = "leader", fetch = FetchType.LAZY)
//    private List<Project> projects;
//
//
//    // Bidirectional relationship to capture the user's participation in projects
//    @ManyToMany(mappedBy = "team", fetch = FetchType.LAZY)
//    private List<Project> participatingProjects;  // Projects where this user is a team member

}
