package com.ssd.SSD.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VacancyDTO {
    @NotEmpty(message = "Поле 'Назва' не може бути порожнім")
    @Size(min = 1, max = 1000, message = "Поле 'Назва' повинно бути в діапазоні між {min} і {max}")
    private String title;

    @NotEmpty(message = "Поле 'Зарплата' не може бути порожнім")
    @Size(min = 1, max = 255, message = "Поле 'Зарплата' повинно бути в діапазоні між {min} і {max}")
    private String salary;

    @NotEmpty(message = "Поле 'Компанія' не може бути порожнім")
    @Size(min = 1, max = 1000, message = "Поле 'Компанія' повинно бути в діапазоні між {min} і {max}")
    private String company;

    @NotEmpty(message = "Поле 'Локація' не може бути порожнім")
    @Size(min = 1, max = 255, message = "Поле 'Локація' повинно бути в діапазоні між {min} і {max}")
    private String location;

    @NotEmpty(message = "Поле 'Тип зайнятості' не може бути порожнім")
    @Size(min = 1, max = 255, message = "Поле 'Тип зайнятості' повинно бути в діапазоні між {min} і {max}")
    private String typeOfEmployment;

    @NotEmpty(message = "Поле 'Опис' не може бути порожнім")
    @Size(min = 1, max = 1000, message = "Поле 'Опис' повинно бути в діапазоні між {min} і {max}")
    private String description;

    @NotEmpty(message = "Поле 'Посилання на вакансію' не може бути порожнім")
    @Size(min = 1, max = 255, message = "Поле 'Посилання на вакансію' повинно бути в діапазоні між {min} і {max}")
    private String urlJob;

}
