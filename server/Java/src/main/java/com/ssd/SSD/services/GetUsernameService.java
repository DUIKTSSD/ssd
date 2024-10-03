package com.ssd.SSD.services;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GetUsernameService {
    public String  getUsernameByDUIKTEmail(String email){
        return UUID.randomUUID().toString();
    }

    public String getUsernameByDUIKTEmailForAmin(String email) {
        return UUID.randomUUID().toString();
    }
}
