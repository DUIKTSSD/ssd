package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.DTO.UserRegistrationRequest;
import com.ssd.SSD.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AdminAuthController {
    private final UserService userService;

    @PostMapping("/admin/reg")
    public ResponseEntity<?> adminReg(@RequestBody UserRegistrationRequest requestAdm){

        userService.registerAdmin( requestAdm.getPassword(), requestAdm.getEmail(), requestAdm.getUsername());
        return ResponseEntity.ok("Регистрация прошла успешно");
    }
    @DeleteMapping("/admin/del/{username}")
    public ResponseEntity<?> adminDel(@PathVariable String username){
        if(userService.deleteAminByUsername(username)){
            return ResponseEntity.ok("Видалення пройшо успішно");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Щось пішло не так");
    }
}
