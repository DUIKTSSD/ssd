package com.ssd.SSD.controllers;

import com.ssd.SSD.DTO.AuthRequest;
import com.ssd.SSD.models.User;
import com.ssd.SSD.DTO.UserRegistrationRequest;
import com.ssd.SSD.services.UserService;
import jakarta.validation.Valid;
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
//@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api/auth")
public class AuthController {
    private static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@stud\\.duikt\\.edu\\.ua$";
    private static final Pattern PATTERN = Pattern.compile(EMAIL_REGEX);
    private final UserService userService;
    private final PolicyFactory policy = Sanitizers.FORMATTING.and(Sanitizers.FORMATTING);


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
    public ResponseEntity<?> register(@RequestBody @Valid UserRegistrationRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(bindingResult.getAllErrors().stream()
                            .map(objectError -> {
                                if (objectError instanceof FieldError) {
                                    FieldError fieldError = (FieldError) objectError;
                                    // Формуємо повідомлення з помилкою і полем, де вона сталася
                                    return fieldError.getDefaultMessage() + " " + fieldError.getField();
                                } else {
                                    // Якщо це не FieldError, повертаємо загальне повідомлення
                                    return objectError.getDefaultMessage();
                                }
                            })
                            .collect(Collectors.toList()));
        }
//        request.setEmail(policy.sanitize(request.getEmail()));
        request.setUsername(policy.sanitize(request.getUsername()));

       if (isValidEmail(request.getEmail())){
           userService.register(request.getPassword(), request.getEmail(), request.getUsername());
           String jwt = userService.createJwtToken(request.getUsername());
           return ResponseEntity.ok(jwt);
       }
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalidний email");
    }




    @GetMapping("/userinfo")
    public String  userInfo(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }


    private boolean isValidEmail(String email){
        if (email == null) {
            return false;
        }
        return PATTERN.matcher(email).matches();
    }
}

