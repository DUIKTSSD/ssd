package com.ssd.SSD.DTO;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserRegistrationRequest {
    @Size( max = 200, message = "пароль має бути до 200 символів")
    private String password;
    @Size( max = 200, message = "імейл має бути до 200 символів")
    private String email;
    @Size(min = 3, max = 200, message = "ім'я користувача має бути в діапазоні між 3 і 200 символів")
    private String username;

}
