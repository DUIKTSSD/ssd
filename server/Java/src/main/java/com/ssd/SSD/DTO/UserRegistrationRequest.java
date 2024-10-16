package com.ssd.SSD.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRegistrationRequest {
    private String password;
    private String email;
    private String username;

}
