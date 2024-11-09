package com.ssd.SSD.repository;

import com.ssd.SSD.models.UserVerification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserToVerificationRedisRepo extends CrudRepository<UserVerification, String  > {
//    Optional<UserVerification> findByEmail(String email);

//    void deleteByEmail(String email);
}
