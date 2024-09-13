package com.ssd.SSD.controllers;

import com.ssd.SSD.models.AuthRequest;
import com.ssd.SSD.models.User;
import com.ssd.SSD.models.UserRegistrationRequest;
import com.ssd.SSD.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/login")
    public ResponseEntity<String > login(@RequestBody AuthRequest request) {
        User user = userService.findByUsername(request.getUsername());

        if (user == null) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверный логин или пароль");
        }


        boolean isPasswordValid = userService.checkPassword(request.getPassword(), user.getPassword());

        if (isPasswordValid) {
            String jwt = userService.createJwtToken(user.getUsername());
            return ResponseEntity.status(HttpStatus.OK).body(jwt);
        } else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверный логин или пароль");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest request) {
        userService.register(request.getUsername(), request.getPassword());
        return ResponseEntity.ok("Регистрация прошла успешно");
    }

    @GetMapping("/UserInfo")
    public String userInfo(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}

