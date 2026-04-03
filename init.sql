CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
INSERT INTO tasks (title) VALUES ('Hoc Docker'), ('Lam bai tap DevOps');