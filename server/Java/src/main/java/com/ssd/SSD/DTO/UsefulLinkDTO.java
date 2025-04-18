package com.ssd.SSD.DTO;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsefulLinkDTO {
    @Size(min = 3, max=255, message = "URL повинен бути в діапазоні між 3-255 символів")
    private String url;

    @Size(min = 3, max=1000, message = "Опис повинен бути в діапазоні між 3-1000 символів")
    private String description;
}
