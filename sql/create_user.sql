CREATE TABLE user_M (
	PRIMARY KEY( id ),
	id				 INT NOT NULL AUTO_INCREMENT  ,
	uid				 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    name             TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    password         TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    faculty          TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    department       TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    money            INT NOT NULL DEFAULT '0',
    student1         TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    student2         TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    student3         TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    student4         TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    student5         TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    student6         TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
	insertDate		 DATETIME  NOT NULL,
	updateDate		 DATETIME,
	deleteFlag		 INT NOT NULL DEFAULT '0'
)
