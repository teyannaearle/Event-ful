\c partyplanning_dev;

INSERT INTO users ( username, password, email, created_on, last_login) VALUES
('tearle92' , 'fakepassword' ,'fakeemail@email.com','2004-10-19 10:23:54', '2004-10-19 10:23:54');

INSERT INTO events ( event_name , event_zip, event_budget, event_date, event_time, user_id ) VALUES
('lindas baby shower' , 11375, 1000, '2021-09-30', '00:30:00', 1);

INSERT INTO tasklist (task_name , is_completed , user_id, event_id ) VALUES 
('catering', false, 1, 1) ,
('djs', false, 1, 1),
('musicians', false, 1, 1),
('partyequipmentrentals', false, 1, 1),
('eventphotography', false, 1, 1),
('videographers', false, 1, 1),
('venues', false, 1, 1),
('balloonservices', false, 1, 1),
('floraldesigners', false, 1, 1);

-- INSERT INTO booked () VALUES
-- ()

-- INSERT INTO favorites () VALUES
-- ()









