package com.ssd.SSD.controllers;

import com.ssd.SSD.DTO.AuthRequest;
import com.ssd.SSD.DTO.EmailVerificationRequest;
import com.ssd.SSD.DTO.UserDTO;
import com.ssd.SSD.models.User;
import com.ssd.SSD.DTO.UserRegistrationRequest;
import com.ssd.SSD.models.UserVerification;
import com.ssd.SSD.notification.MessageSender;
import com.ssd.SSD.services.UserService;
import com.ssd.SSD.services.UserToVerificationRedisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final String EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@stud\\.duikt\\.edu\\.ua$";
    private static final Pattern PATTERN = Pattern.compile(EMAIL_REGEX);
    private final PolicyFactory policy = Sanitizers.FORMATTING.and(Sanitizers.FORMATTING);
    private final UserService userService;
    private final MessageSender messageSender;
    private final UserToVerificationRedisService userVerificService;
    private final String title = "Verification Code";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        User user = userService.findByEmail(request.getEmail());

        if (user == null) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("This email not exits");
        }

        boolean isPasswordValid = userService.checkPassword(request.getPassword(), user.getPassword());

        if (isPasswordValid) {
            String jwt = userService.createJwtToken(user.getUsername(),user.getRole());

            return ResponseEntity.ok( jwt);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверный логин или пароль");
        }
    }



    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserRegistrationRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(bindingResult.getFieldErrors().stream()
                            .map(DefaultMessageSourceResolvable::getDefaultMessage)
                            .toList());
        }
        request.setUsername(policy.sanitize(request.getUsername()));

        if (isValidEmail(request.getEmail()) && userService.findByEmail(request.getEmail()) == null){

            String code = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 1000000));

            if(messageSender.sendSync(code,title, request.getEmail())){
                userVerificService.save(request,code);
                return ResponseEntity.ok("Verification Code code send to " + request.getEmail());
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalidний email");
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody EmailVerificationRequest request){
        UserVerification userVerification = userVerificService.getByEmail(request.getEmail());
        if (userVerification.getCode().equals(request.getCode())){
            User user = userService.register(userVerification.getPassword(), userVerification.getEmail(), userVerification.getUsername());
            userVerificService.removeByEmail(request.getEmail());

            String jwt = userService.createJwtToken(userVerification.getUsername(),user.getRole() );
            return ResponseEntity.ok(jwt);

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("code was bad");
    }


    @GetMapping("/userinfo")
    public ResponseEntity<?> userInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(userDTO);
    }

    private boolean isValidEmail(String email) {
        if (email == null) {
            return false;
        }
        return PATTERN.matcher(email).matches();
    }
}

