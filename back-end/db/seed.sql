\c partyplanning_dev;

INSERT INTO users ( username, password, email, created_on, last_login) VALUES
('tearle92' , 'fakepassword' ,'fakeemail@email.com','2020-10-19 10:23:54', '2020-10-19 10:23:54'),
('ebreo' , 'password' ,'email@email.com','2020-10-19 10:23:54', '2020-10-19 10:23:54');

INSERT INTO events ( event_name , event_zip, event_budget, event_date, event_time, user_id ) VALUES
('Lindas Baby Shower' , '11375', 1000, '2021-09-30', '00:30:00', 1),
('Saras Birthday Party' , '10025', 1500, '2021-09-30', '00:30:00', 1),
('Michaels Retirement Party' , '10036', 2000, '2021-09-30', '00:30:00', 1),
('Lauras Baby Shower' , '11375', 1000, '2021-09-30', '00:30:00', 2),
('Mindys Birthday Party' , '10025', 1500, '2021-09-30', '00:30:00', 2),
('Justins Retirement Party' , '10036', 2000, '2021-09-30', '00:30:00', 2);

INSERT INTO tasklist (task_name , is_completed , user_id, event_id ) VALUES 
('catering', false, 1, 1) ,
('djs', false, 1, 1),
('musicians', false, 1, 1),
('party rental', false, 1, 1),
('eventphotography', false, 1, 1),
('videographers', false, 1, 1),
('venues', false, 1, 1),
('balloons', false, 1, 1),
('floraldesigners', false, 1, 1),
('catering', false, 1, 2) ,
('djs', false, 1, 2),
('musicians', false, 1, 2),
('party rental', false, 1, 2),
('eventphotography', false, 1, 2),
('videographers', false, 1, 2),
('catering', false, 1, 3) ,
('djs', false, 1, 3),
('musicians', false, 1, 3),
('party rental', false, 1, 3),
('eventphotography', false, 1, 3),
('videographers', false, 1, 3),
('catering', false, 2, 4) ,
('djs', false, 2, 4),
('musicians', false, 2, 4),
('party rental', false, 2, 4),
('eventphotography', false, 2, 4),
('videographers', false, 2, 4),
('catering', false, 2, 5) ,
('djs', false, 2, 5),
('musicians', false, 2, 5),
('party rental', false, 2, 6),
('eventphotography', false, 2, 6),
('videographers', false, 2, 6);



INSERT INTO booked ( user_id, event_id, task_id, vendor_name , vendor_address , vendor_phone_number, amount ) VALUES
(1, 1, 1, 'Dave & Busters' , '234 west 42nd street', '6464952015', 400),
(2, 1, 1, 'Dave & Busters' , '234 west 42nd street', '6464952015', 400);


INSERT INTO favorites ( user_id , vendor_name , vendor_address ,  vendor_phone_number) VALUES
(1, 'Dave & Busters' , '234 west 42nd street', '6464952015'),
(2, 'Dave & Busters' , '234 west 42nd street', '6464952015');









