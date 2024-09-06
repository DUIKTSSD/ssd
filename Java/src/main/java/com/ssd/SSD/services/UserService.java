package com.ssd.SSD.services;

import com.ssd.SSD.exception.UserAlreadyExistsException;
import com.ssd.SSD.models.User;
import com.ssd.SSD.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException("Пользователь уже существует");
        }

        User user = new User();
        user.setUsername(username);
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
}
