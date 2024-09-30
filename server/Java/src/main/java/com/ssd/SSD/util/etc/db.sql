-- INSERT INTO users(password, role, username, email) VALUES ('$2a$10$QEYEPLIVsyuYgSS1X1FvNeRFWlGXB8eNbclrSfgGuxEX5lO8ibrdK','ROLE_ADMIN','ADMIN','ADMIN@gamil.com')

DELETE FROM project_team WHERE true;
DELETE FROM projects WHERE true;
DELETE FROM users WHERE true;

DROP TABLE project_team;
DROP TABLE users;
DROP TABLE projects;
