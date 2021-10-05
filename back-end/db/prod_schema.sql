DROP DATABASE IF EXISTS dda2ivrdt7akio;
CREATE DATABASE dda2ivrdt7akio;
\c dda2ivrdt7akio;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    password VARCHAR (50) NOT NULL, 
    email VARCHAR (255) UNIQUE NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR (255) NOT NULL, 
    event_budget INTEGER DEFAULT 0 ,
    event_date DATE,
    event_time TIME,
    user_id  SERIAL, CONSTRAINT fk_events_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS tasklist CASCADE;
CREATE TABLE tasklist (
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

    user_id  SERIAL, CONSTRAINT fk_booked_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    event_id SERIAL, CONSTRAINT fk_booked_events FOREIGN KEY(event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    vendor_name VARCHAR (255) NOT NULL, 
    vendor_address VARCHAR (255) NOT NULL,
    vendor_phone_number VARCHAR (11) NOT NULL,
    vendor_image VARCHAR NOT NULL,
    rating INTEGER DEFAULT 0,
    category VARCHAR (255) NOT NULL,
    amount numeric DEFAULT 0
);

    
DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
    user_id  SERIAL, CONSTRAINT fk_favorites_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    vendor_name VARCHAR (255) NOT NULL, 
    vendor_address VARCHAR (255) NOT NULL, 
    vendor_phone_number VARCHAR (15) NOT NULL,
    vendor_id  VARCHAR (255) NOT NULL,
    vendor_category VARCHAR (255) NOT NULL, 
    vendor_image VARCHAR NOT NULL,
    vendor_rating INTEGER DEFAULT 0
);
