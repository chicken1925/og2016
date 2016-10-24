CREATE TABLE user_student_M (
	PRIMARY KEY( id ),
	id				 INT NOT NULL AUTO_INCREMENT  ,
	uid				 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
	bachelor		 INT NOT NULL DEFAULT '0',
	master			 INT NOT NULL DEFAULT '0',
	doctor			 INT NOT NULL DEFAULT '0',
	insertDate		 DATETIME  NOT NULL,
	updateDate		 DATETIME,
	deleteFlag		 INT NOT NULL DEFAULT '0'
) 
