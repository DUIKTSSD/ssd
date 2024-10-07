package com.ssd.SSD.DTO;

import com.ssd.SSD.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
public class DocumentationDTO {

    private Long id;

    private String name;

    private String  file;

    private User author;

    private Date createdAt;
}
