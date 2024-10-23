package com.ssd.SSD.DTO;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectDTO {
    private String title;

    private String mainText;

    private String technologyStack;

    private String wishes; //to the team

    private String phoneNumber;

    private String telegramProfile;
}
