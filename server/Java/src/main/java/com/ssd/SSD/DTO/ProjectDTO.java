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
    @NotEmpty
    @Size(min = 3, max = 100)
    private String title;

    @NotEmpty
    @Size(min = 30, max = 3000)
    private String mainText;

    @NotEmpty
    @Size(min = 30, max = 3000)
    private String technologyStack;

    @Size( max = 1000)
    private String wishes; //to the team

    @Size(max = 13)
    private String phoneNumber;

    @Size( max = 100)
    private String telegramProfile;
}
