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

    @ExceptionHandler(UserToVerificationNotFoundException.class)
    public ResponseEntity<?> handleDocumentNotFoundException(UserToVerificationNotFoundException e){
        return new ResponseEntity<>("User to verification not found", HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(LimitIsIncreased.class)
    public ResponseEntity<?> handleDocumentNotFoundException(LimitIsIncreased e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DBNotFoundException.class)
    public ResponseEntity<?> handleDBNotFoundException(DBNotFoundException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }


}
