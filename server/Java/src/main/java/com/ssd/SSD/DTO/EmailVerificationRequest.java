package com.ssd.SSD.DTO;

import lombok.Data;

@Data
public class EmailVerificationRequest {
    private String email;
    private String code;
}
