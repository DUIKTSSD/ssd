package com.ssd.SSD.notification;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageSender {
    void sendAsync(String  text, String title, String consumerEmail); // асинхронний метод
    boolean sendSync(String  text, String title, String consumerEmail); // синхронний метод з результатом
}
