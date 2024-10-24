package com.ssd.SSD.DTO;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRegistrationRequest {
    @Size( max = 200)
    private String password;
    @Size( max = 200)
    private String email;
    @Size(min = 3, max = 200)
    private String username;

}
