CREATE TABLE user_M (
	PRIMARY KEY( id ),
	id				 INT NOT NULL AUTO_INCREMENT  ,
	uid				 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
	name			 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
	insertDate		 DATETIME  NOT NULL,
	updateDate		 DATETIME,
	deleteFlag		 INT NOT NULL DEFAULT '0'
) 

ALTER TABLE user_M ADD (
    password		 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    lab				 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci 
);

ALTER TABLE user_M ADD (
    department		 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    
);

ALTER TABLE user_M change canpus campus TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci;