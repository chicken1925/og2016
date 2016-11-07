CREATE TABLE student_M (
	PRIMARY KEY( id ),
	id				 INT NOT NULL AUTO_INCREMENT  ,
    name             TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    grade            INT NOT NULL DEFAULT '0',
    personality      INT NOT NULL DEFAULT '0',
    speciality       INT NOT NULL DEFAULT '0',
    logic            INT NOT NULL DEFAULT '0',
    develop          INT NOT NULL DEFAULT '0',
    communicate      INT NOT NULL DEFAULT '0',
    skill1           INT NOT NULL DEFAULT '0',
    skill2           INT NOT NULL DEFAULT '0',
    skill3           INT NOT NULL DEFAULT '0',
    history_lab      INT NOT NULL DEFAULT '0',
    stu_type         INT NOT NULL DEFAULT '0',
	insertDate		 DATETIME  NOT NULL,
	updateDate		 DATETIME,
	deleteFlag		 INT NOT NULL DEFAULT '0'
) 

ALTER TABLE student_M ADD (
    course_t         INT NOT NULL DEFAULT '0'
);
ALTER TABLE student_M AUTO_INCREMENT = 1
