package com.ssd.SSD.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.io.Serializable;
import java.time.Duration;

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

    @TimeToLive
    private Long expiration = Duration.ofMinutes(15).toSeconds(); // TTL в секундах

    public UserVerification(String email, String password, String username, String code) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.code = code;
    }
}
