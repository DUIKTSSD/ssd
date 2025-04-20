package com.ssd.SSD.DTO;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VacancyDTO {
    @Size(min = 1, max = 1000, message = "Поле 'Назва' повинно бути в діапазоні між {min} і {max}")
    private String title;

    @Size(min = 1, max = 1000, message = "Поле 'Компанія' повинно бути в діапазоні між {min} і {max}")
    private String company;

    @Size(min = 1, max = 255, message = "Поле 'Локація' повинно бути в діапазоні між {min} і {max}")
    private String location;

    @Size(min = 1, max = 255, message = "Поле 'Тип зайнятості' повинно бути в діапазоні між {min} і {max}")
    private String typeOfEmployment;

    @Size(min = 1, max = 1000, message = "Поле 'Опис' повинно бути в діапазоні між {min} і {max}")
    private String description;

    @Size(min = 1, max = 255, message = "Поле 'Посилання на вакансію' повинно бути в діапазоні між {min} і {max}")
    private String urlJob;

}
