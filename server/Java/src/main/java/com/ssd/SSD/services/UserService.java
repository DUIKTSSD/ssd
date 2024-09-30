package com.ssd.SSD.services;

import com.ssd.SSD.exception.UserAlreadyExistsException;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.UserRepository;
import com.ssd.SSD.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public User register(String username, String password, String email) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException("Пользователь уже существует");
        }
        if (userRepository.findByEmail(email).isPresent()){
            throw new UserAlreadyExistsException("Користувач з даним імейлом уже зареєстріруваний");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("ROLE_USER");

        return userRepository.save(user);
    }
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElse(null);
    }

    public String createJwtToken(String username) {
        return jwtUtil.generateToken(username);
    }
    @Transactional
    public User registerAdmin(String username, String password, String email) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException("Пользователь уже существует");
        }
        if (userRepository.findByEmail(email).isPresent()){
            throw new UserAlreadyExistsException("Користувач з даним імейлом уже зареєстріруваний");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("ROLE_ADMIN");

        return userRepository.save(user);
    }

    @Transactional
    public boolean deleteAminByUsername(String username){
        try {
            userRepository.removeByUsernameAndRole(username,"ROLE_ADMIN");
        }catch (Exception e){
            return false;
        }
        return true;
    }

    public User findById(Long leaderId) {
        return userRepository.findById(leaderId).orElse(null);
    }
}
