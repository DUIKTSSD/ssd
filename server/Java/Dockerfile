# Базовий образ OpenJDK
FROM openjdk:17-jdk-alpine

# Копіюємо JAR-файл у контейнер
COPY target/SSD-0.0.1-SNAPSHOT.jar /app/SSD-0.0.1-SNAPSHOT.jar

# Встановлюємо команду запуску додатка
ENTRYPOINT ["java", "-jar", "/app/SSD-0.0.1-SNAPSHOT.jar"]

# Відкриваємо порт 8080 для додатка
EXPOSE 8080
