package com.ssd.SSD.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import org.springframework.data.redis.core.RedisHash;
import java.io.Serializable;

@RedisHash("UserVerification")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVerification implements Serializable {
    @Id
    private String email;
    private String password;
    private String username;
    private String code;
}
