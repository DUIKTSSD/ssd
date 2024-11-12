package com.ssd.SSD.DTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
public class CollectiveDTO {

    private String name;
    private String phone;
    private String group;
    private String specialty;
    private String description;
    private String inFact;
    private String team; //if null they Голови відділу
}
