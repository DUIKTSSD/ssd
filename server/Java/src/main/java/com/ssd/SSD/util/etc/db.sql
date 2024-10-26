INSERT INTO users(password, role, username, email) VALUES ('$2a$10$3YFKTSc7H8RcAE9ImRXgjOjCPN1o/XzxMPavETln2GO.WuytVkb4a','ROLE_ADMIN','ADMIN','ADMIN@gamil.com');
INSERT INTO users(password, role, username, email) VALUES ('$2a$10$/Mcs6E9Y/lNonurznU8S2.l8qujIAex8mXJJcao23dHtGiKSb.eDi','ROLE_ADMIN','AD','AD@gamil.com');--first



DELETE FROM project_team WHERE true;
DELETE FROM projects WHERE true;
DELETE FROM users WHERE true;

DROP TABLE project_team;
DROP TABLE users;
DROP TABLE projects;


