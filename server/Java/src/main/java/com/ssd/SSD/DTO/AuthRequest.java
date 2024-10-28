package com.ssd.SSD.DTO;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthRequest {
    @Size( max = 200)
    private String email;
    @Size( max = 200)
    private String password;

}

