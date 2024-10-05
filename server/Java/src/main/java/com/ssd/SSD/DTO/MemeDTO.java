package com.ssd.SSD.DTO;

import com.ssd.SSD.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemeDTO {

    private String image;

    private User  author;

}
