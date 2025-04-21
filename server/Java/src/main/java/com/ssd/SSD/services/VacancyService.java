package com.ssd.SSD.services;

import com.ssd.SSD.DTO.VacancyDTO;
import com.ssd.SSD.exception.DBNotFoundException;
import com.ssd.SSD.models.Vacancy;
import com.ssd.SSD.repository.VacancyRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VacancyService {
    private final VacancyRepository vacancyRepository;


    public Page<Vacancy> getALl(Integer pageNumber, Integer pageSize) {
        return vacancyRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }

    public void create(@Valid VacancyDTO vacancy) {
        vacancyRepository.save(Vacancy.builder()
                .title(vacancy.getTitle())
                .salary(vacancy.getSalary())
                .company(vacancy.getCompany())
                .location(vacancy.getLocation())
                .typeOfEmployment(vacancy.getTypeOfEmployment())
                .description(vacancy.getDescription())
                .urlJob(vacancy.getUrlJob())
                .build());
    }

    public void deleteById(long id) {
        vacancyRepository.deleteById(id);
    }

    public Vacancy getById(long id) {
        return vacancyRepository.findById(id).orElseThrow(() -> new DBNotFoundException("Вакансія за id: " + id + " не зайдена"));
    }
}
