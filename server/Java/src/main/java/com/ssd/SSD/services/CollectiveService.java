package com.ssd.SSD.services;

import com.ssd.SSD.DTO.CollectiveDTO;
import com.ssd.SSD.exception.DBNotFoundException;
import com.ssd.SSD.models.Collective;
import com.ssd.SSD.repository.CollectiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CollectiveService {
    private final CollectiveRepository collectiveRepository;

    @Transactional
    public Collective save(CollectiveDTO collectiveDTO, MultipartFile image) throws IOException {
        Collective c = new Collective();

        c.setName(collectiveDTO.getName());
        c.setPhone(collectiveDTO.getPhone());
        c.setDuiktGroup(collectiveDTO.getGroup());
        c.setImage(image.getBytes());
        c.setSpecialty(collectiveDTO.getSpecialty());
        c.setDescription(collectiveDTO.getDescription());
        c.setInFact(collectiveDTO.getInFact());
        c.setTeam(collectiveDTO.getTeam());

        return collectiveRepository.save(c);
    }

    @Transactional
    public void remove(Long id) {
        collectiveRepository.deleteById(id);
    }

    public Collective getById(Long id){
        return collectiveRepository.findById(id).orElseThrow(() -> new DBNotFoundException("This person of \"Collective\" not found"));
    }

    public List<Collective> getAll(){
        return collectiveRepository.findAll();
    }
}
