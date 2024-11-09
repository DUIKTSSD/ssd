package com.ssd.SSD.services;

import com.ssd.SSD.DTO.UserRegistrationRequest;
import com.ssd.SSD.exception.UserToVerificationNotFoundException;
import com.ssd.SSD.models.UserVerification;
import com.ssd.SSD.repository.UserToVerificationRedisRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserToVerificationRedisService {
    private final UserToVerificationRedisRepo userRepo;


    public void save(UserRegistrationRequest user, String code){
        UserVerification userVerification = new UserVerification(user.getEmail(),user.getPassword(), user.getPassword(), code);
        userRepo.save(userVerification);
    }

    public UserVerification getByEmail(String email){
        return userRepo.findById(email).orElseThrow(UserToVerificationNotFoundException::new);
    }

    public void removeByEmail(String email){
        userRepo.deleteById(email);
    }

}
