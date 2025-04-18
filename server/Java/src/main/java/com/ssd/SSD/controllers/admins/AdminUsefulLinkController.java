package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.DTO.UsefulLinkDTO;
import com.ssd.SSD.services.UsefulLinkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/useful-link/admin")
@RequiredArgsConstructor
public class AdminUsefulLinkController {
    private final UsefulLinkService usefulLinkService;

    @PostMapping("/add")
    public ResponseEntity<?> create(@Valid @RequestBody UsefulLinkDTO  usefulLinkDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(bindingResult.getFieldErrors().stream()
                            .map(DefaultMessageSourceResolvable::getDefaultMessage)
                            .toList());
        }
        usefulLinkService.save(usefulLinkDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("del/{id:\\d+}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        usefulLinkService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
