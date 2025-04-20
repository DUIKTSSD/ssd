package com.ssd.SSD.controllers.admins;

import com.ssd.SSD.DTO.VacancyDTO;
import com.ssd.SSD.models.Vacancy;
import com.ssd.SSD.services.VacancyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/vacancy/admin")
public class AdminVacancyController {
    private final VacancyService vacancyService;

    @PostMapping("/add")
    public ResponseEntity<?> addVacancy(@RequestBody @Valid VacancyDTO vacancy, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(bindingResult.getFieldErrors().stream()
                            .map(DefaultMessageSourceResolvable::getDefaultMessage)
                            .toList());
        }
        vacancyService.create(vacancy);
        return ResponseEntity.ok("created successfully");
    }

    @DeleteMapping("/del/{id:\\d+}")
    public ResponseEntity<?> deleteVacancy(@PathVariable long id) {
        vacancyService.deleteById(id);
        return ResponseEntity.ok("deleted successfully");
    }
}
