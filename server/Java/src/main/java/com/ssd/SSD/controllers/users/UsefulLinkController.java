package com.ssd.SSD.controllers.users;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsefulLinkController {

    @GetMapping
    public ResponseEntity<String> getUsefulLink() {

    }
}
