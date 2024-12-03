package com.ssd.SSD.exception;

public class DBNotFoundException extends RuntimeException{
    public DBNotFoundException(String e){
        super(e);
    }
}
