package com.ssd.SSD.notification;

public interface MessageSender {
    void sendAsync(String  text, String title, String consumerEmail); // асинхронний метод
    Boolean sendSync(String  text, String title, String consumerEmail); // синхронний метод з результатом
}
