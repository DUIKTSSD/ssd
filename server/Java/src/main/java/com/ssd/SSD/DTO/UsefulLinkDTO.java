package com.ssd.SSD.DTO;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsefulLinkDTO {
    private String url;
    private String description;
}
