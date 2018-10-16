INSERT INTO mydb.department (abbreviation, name) VALUES ('SEng', 'School of Engineering');
INSERT INTO mydb.department (abbreviation, name) VALUES ('SHSS', 'School of Humanity and Social Sciences');
INSERT INTO mydb.department (abbreviation, name) VALUES ('SST', 'School of Science and Technology');

INSERT INTO mydb.user (email, password, name, surname, `access level`) VALUES ('hm@gmail.com', '12345', 'mayaku', 'hiadzaki', 3);

INSERT INTO mydb.student (year, major, minor, department_abbreviation, user_email1) VALUES (2, 'Cs', 'Robotics', 'SST', 'hm@gmail.com');

INSERT INTO mydb.schedule (`Schedule Name`) VALUES ('New Cool Schedule');

INSERT INTO mydb.section (title, time, course_abbr, days, term, year, credits, instructor, room, department_abbreviation, endtime) VALUES ('Introduction to Potions', '09:00:00', 'ALCHEM162', 'MWF', 'Spring', 2016, 4, 'Severus Snape', '7.104', 'SST', '11:00:00');
INSERT INTO mydb.section (title, time, course_abbr, days, term, year, credits, instructor, room, department_abbreviation, endtime) VALUES ('Calculus I', '10:00:00', 'MATH161', 'MWF', 'Spring', 2016, 4, 'Daniel Radcliffe', '7.204', 'SST', '10:50:00');
INSERT INTO mydb.section (title, time, course_abbr, days, term, year, credits, instructor, room, department_abbreviation, endtime) VALUES ('Calculus II', '12:00:00', 'MATH162', 'MWF', 'Spring', 2016, 4, 'Hayadzaki Mayaku', '7.304', 'SST', '12:50:00');
INSERT INTO mydb.section (title, time, course_abbr, days, term, year, credits, instructor, room, department_abbreviation, endtime) VALUES ('Discrete Math', '13:30:00', 'MATH252', 'TR', 'Spring', 2016, 4, 'Pascal', '7.240', 'SST', '14:45:00');
INSERT INTO mydb.section (title, time, course_abbr, days, term, year, credits, instructor, room, department_abbreviation, endtime) VALUES ('History of Russia', '18:00:00', 'HIST263', 'TR', 'Spring', 2016, 4, 'Fiona Stone', '8.314', 'SHSS', '19:15:00');
INSERT INTO mydb.section (title, time, course_abbr, days, term, year, credits, instructor, room, department_abbreviation, endtime) VALUES ('Kazakh Rhetorics', '09:00:00', 'KAZ363', 'MWF', 'Spring', 2016, 4, 'Meiramgul Mercury', '8.314', 'SHSS', '09:50:00');

INSERT INTO mydb.schedule_has_section (`schedule_Schedule ID`, section_id, section_year, section_term) VALUES (1, 4, 2016, 'Spring');
INSERT INTO mydb.schedule_has_section (`schedule_Schedule ID`, section_id, section_year, section_term) VALUES (1, 5, 2016, 'Spring');

INSERT INTO mydb.student_has_schedule (student_user_email1, `schedule_Schedule ID`) VALUES ('hm@gmail.com', 1);
