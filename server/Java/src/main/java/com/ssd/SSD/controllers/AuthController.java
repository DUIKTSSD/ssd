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

import java.util.regex.Pattern;

@RestController
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
       if (isValidEmail(request.getEmail())){
           userService.register(request.getPassword(), request.getEmail());
           return ResponseEntity.ok("Регистрация прошла успешно");
       }
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalidний email");
    }

    @PostMapping("/admin/reg")
    public ResponseEntity<?> adminReg(@RequestBody UserRegistrationRequest requestAdm){

        userService.registerAdmin( requestAdm.getPassword(), requestAdm.getEmail());
        return ResponseEntity.ok("Регистрация прошла успешно");
    }
    @DeleteMapping("/admin/del/{username}")
    public ResponseEntity<?> adminDel(@PathVariable String username){
        if(userService.deleteAminByUsername(username)){
            return ResponseEntity.ok("Видалення пройшо успішно");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Щось пішло не так");
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

