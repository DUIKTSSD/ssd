package com.ssd.SSD.notification;

public class EmailSender implements MessageSender {
    @Override
    public void sendAsync(String text, String title, String consumerEmail) {
        new Thread(()->{
            sendSync(text,title,consumerEmail);
        });
    }

    @Override
    public Boolean sendSync(String text, String title, String consumerEmail) {
        return null;
    }
}
