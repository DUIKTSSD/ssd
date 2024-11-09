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
    public ResponseEntity<?> handleGalleryNotFoundException(GalleryNotFoundException e){
        return new ResponseEntity<>("Gallery not found", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NewsNotFoundException.class)
    public ResponseEntity<?> handleNewsNotFoundException(NewsNotFoundException e){
        return new ResponseEntity<>("News not found", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DocumentationNotFoundException.class)
    public ResponseEntity<?> handleDocumentNotFoundException(DocumentationNotFoundException e){
        return new ResponseEntity<>("Document not found", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserToVerificationNotFoundException.class)
    public ResponseEntity<?> handleDocumentNotFoundException(UserToVerificationNotFoundException e){
        return new ResponseEntity<>("User to verification not found", HttpStatus.BAD_REQUEST);
    }

}
