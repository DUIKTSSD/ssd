package com.ssd.SSD.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MemesNotFoundException.class)
    public ResponseEntity<?> handleMemeNotFoundException(MemesNotFoundException e){
        return new ResponseEntity<>("Memes not found", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(GalleryNotFoundException.class)
    public ResponseEntity<?> handleMemeNotFoundException(GalleryNotFoundException e){
        return new ResponseEntity<>("Gallery not found", HttpStatus.BAD_REQUEST);
    }

}
