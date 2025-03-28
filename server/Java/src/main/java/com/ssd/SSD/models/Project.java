package com.ssd.SSD.models;

import com.ssd.SSD.DTO.ProjectDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor

public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    @Lob
    @Column(nullable = false)
    private String mainText;
    @Lob
    private String technologyStack;
    @Lob
    private String wishes; //to the team

    private String phoneNumber;

    private String telegramProfile;

    private Boolean status; // false is closed

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "project_team",  // Join table name
            joinColumns = @JoinColumn(name = "project_id"),  // Foreign key to this entity
            inverseJoinColumns = @JoinColumn(name = "user_id")  // Foreign key to the associated entity (User)
    )
    private List<User> team;  // Team members, excluding the leader

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)

    private User leader;

    private Boolean isLegal;

    public Project(ProjectDTO projectDTO){
        this.title = projectDTO.getTitle();
        this.mainText = projectDTO.getMainText();
        this.technologyStack = projectDTO.getTechnologyStack();
        this.wishes = projectDTO.getWishes();
        this.telegramProfile = projectDTO.getTelegramProfile();
        this.phoneNumber = projectDTO.getPhoneNumber();
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", leader=" + leader +
                ", title='" + title + '\'' +
                ", mainText='" + mainText + '\'' +
                ", technologyStack='" + technologyStack + '\'' +
                ", wishes='" + wishes + '\'' +
                '}';
    }
}
