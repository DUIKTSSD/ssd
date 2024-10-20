package com.ssd.SSD.controllers;

import com.ssd.SSD.DTO.AuthRequest;
import com.ssd.SSD.models.User;
import com.ssd.SSD.DTO.UserRegistrationRequest;
import com.ssd.SSD.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;

@RestController
//@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api/auth")
public class AuthController {
    private static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@stud\\.duikt\\.edu\\.ua$";
    private static final Pattern PATTERN = Pattern.compile(EMAIL_REGEX);

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/login")
    public ResponseEntity<String > login(@RequestBody AuthRequest request) {
        User user = userService.findByEmail(request.getEmail());

        if (user == null) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("This email not exits");
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
       if (isValidEmail(request.getEmail())){
           userService.register(request.getPassword(), request.getEmail(), request.getUsername());
           String jwt = userService.createJwtToken(request.getUsername());
           return ResponseEntity.ok(jwt);
       }
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalidний email");
    }




    @GetMapping("/UserInfo")
    public String userInfo(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }


    private boolean isValidEmail(String email){
        if (email == null) {
            return false;
        }
        return PATTERN.matcher(email).matches();
    }
}

