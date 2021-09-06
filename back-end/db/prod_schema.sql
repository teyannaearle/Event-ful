DROP DATABASE IF EXISTS partyplanning_dev;
CREATE DATABASE partyplanning_dev;
\c partyplanning_dev;

DROP TABLE IF EXISTS users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR (50) UNIQUE NOT NULL, 
    password VARCHAR (50) NOT NULL, 
    email VARCHAR (255) UNIQUE NOT NULL, 
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP 
);

DROP TABLE IF EXISTS tasklist
CREATE TABLE tasklist (
    user_id FOREIGN KEY REFERENCES users(user_id)(ON UPDATE CASCADE ON DELETE CASCADE), 
    task_id SERIAL PRIMARY KEY, (INT AUTO_INCREMENT PRIMARY KEY),
    task_name VARCHAR (255) NOT NULL, 
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS booked
CREATE TABLE booked (
    user_id FOREIGN KEY REFERENCES users(user_id)(ON UPDATE CASCADE ON DELETE CASCADE), 
    task_id FOREIGN KEY REFERENCES tasklist(task_id),
    vendor_name VARCHAR (255) NOT NULL, 
    vendor_address VARCHAR (255) NOT NULL,
    vendor_phone_number INT,
    amount INTEGER
);


DROP TABLE IF EXISTS favorites
CREATE TABLE favorites (
    user_id FOREIGN KEY REFERENCES users(user_id)(ON UPDATE CASCADE ON DELETE CASCADE), 
    vendor_name VARCHAR (255) NOT NULL, 
    vendor_address VARCHAR (255) NOT NULL, 
    vendor_phone_number INT
);