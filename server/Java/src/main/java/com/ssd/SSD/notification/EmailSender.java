package com.ssd.SSD.notification;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class EmailSender implements MessageSender {
    @Override
    public void sendAsync(String text, String title, String consumerEmail) {
        new Thread(()->{
            sendSync(text,title,consumerEmail);
        });
    }

    @Override
    public boolean sendSync(String text, String title, String consumerEmail) {
        return true;
    }
}
