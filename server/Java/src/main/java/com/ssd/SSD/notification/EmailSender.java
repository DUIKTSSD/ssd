package com.ssd.SSD.notification;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
@Service
public class EmailSender implements MessageSender {
    @Autowired
    JavaMailSender javaMailSender;
    @Value("${spring.mail.sender.email}")
    String senderEmail;
    @Value("${spring.mail.sender.text}")
    String senderText;
    @Override
    public void sendAsync(String text, String title, String consumerEmail) {
        new Thread(()->{
            sendSync(text,title,consumerEmail);
        }).start();
    }

    @Override
    public boolean sendSync(String text, String title, String consumerEmail) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo(consumerEmail);
        message.setSubject(title);
        message.setText(text);
        javaMailSender.send(message);

        return true;
    }
}
