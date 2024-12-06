package com.ssd.SSD.DTO;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectDTO {

    @Size(min = 3, message = "title must be from 3 characters")
    private String title;

    @Size(min = 10, message = "mainText must be from 10 characters")
    private String mainText;

    @Size(min = 10, message = "technologyStack must be from 10 characters")
    private String technologyStack;

    @Size( max = 1000, message = "phoneNumber must be to 1000 characters(max = 1000)")
    private String wishes; //to the team

    @Size(max = 13, message = "phoneNumber must be to 13 characters(max = 100)")
    private String phoneNumber;

    @Size( max = 100, message = "telegramProfile must be to 100 characters(max = 100)")
    private String telegramProfile;
}
