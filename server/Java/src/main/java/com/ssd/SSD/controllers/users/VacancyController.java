package com.ssd.SSD.controllers.users;

import com.ssd.SSD.services.VacancyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/vacancy")
public class VacancyController {

    private final VacancyService vacancyService;

    @GetMapping
    public ResponseEntity<?> getAllVacancies(
            @RequestParam(defaultValue = "0") Integer pageNumber
            , @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        return ResponseEntity.ok(vacancyService.getALl(pageNumber, pageSize));
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<?> getVacancyById(@PathVariable long id) {
        return ResponseEntity.ok(vacancyService.getById(id));
    }
}
