package com.ssd.SSD.DTO;

import com.ssd.SSD.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsDTO {

    private String  image;

    private String text;

    private User author;

    private Date createdAt;

}
