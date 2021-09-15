DROP DATABASE IF EXISTS partyplanning_dev;
CREATE DATABASE partyplanning_dev;
\c partyplanning_dev;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR (50) UNIQUE NOT NULL, 
    password VARCHAR (50) NOT NULL, 
    email VARCHAR (255) UNIQUE NOT NULL, 
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP 
);

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR (255) NOT NULL, 
    -- event_zip VARCHAR (5) NOT NULL,
    event_budget INTEGER DEFAULT 0 ,
    event_date DATE,
    event_time TIME,
    user_id  SERIAL, CONSTRAINT fk_events_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE 
);


DROP TABLE IF EXISTS tasklist CASCADE;
CREATE TABLE tasklist (
    -- user_id FOREIGN KEY REFERENCES users(user_id)(ON UPDATE CASCADE ON DELETE CASCADE), 
    -- event_id FOREIGN KEY REFERENCES events(event_id)(ON UPDATE CASCADE ON DELETE CASCADE),
    -- task_id SERIAL PRIMARY KEY, (INT AUTO_INCREMENT PRIMARY KEY),
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR (255) NOT NULL, 
    task_cost numeric DEFAULT 0,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id  SERIAL, CONSTRAINT fk_tasklist_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    event_id SERIAL, CONSTRAINT fk_tasklist_events FOREIGN KEY(event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS booked CASCADE;
CREATE TABLE booked (
    -- user_id FOREIGN KEY REFERENCES users(user_id)(ON UPDATE CASCADE ON DELETE CASCADE),
    -- event_id FOREIGN KEY REFERENCES events(event_id)(ON UPDATE CASCADE ON DELETE CASCADE),
    -- task_id FOREIGN KEY REFERENCES tasklist(task_id),
    user_id  SERIAL, CONSTRAINT fk_booked_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    event_id SERIAL, CONSTRAINT fk_booked_events FOREIGN KEY(event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    task_id SERIAL, CONSTRAINT fk_booked_tasklist FOREIGN KEY(task_id) REFERENCES tasklist(task_id) ON DELETE CASCADE,
    vendor_name VARCHAR (255) NOT NULL, 
    vendor_address VARCHAR (255) NOT NULL,
    vendor_phone_number VARCHAR (11) NOT NULL,
    amount INTEGER
);

    
DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
    -- user_id FOREIGN KEY REFERENCES users(user_id)(ON UPDATE CASCADE ON DELETE CASCADE), 
    user_id  SERIAL, CONSTRAINT fk_favorites_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    vendor_name VARCHAR (255) NOT NULL, 
    vendor_address VARCHAR (255) NOT NULL, 
    vendor_phone_number VARCHAR (11) NOT NULL
);
