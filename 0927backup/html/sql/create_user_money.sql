CREATE TABLE user_money_M (
	PRIMARY KEY( id ),
	id				 INT NOT NULL AUTO_INCREMENT  ,
	uid				 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
	all_m			 INT NOT NULL DEFAULT '0',
	per_m			 INT NOT NULL DEFAULT '0',
	insertDate		 DATETIME  NOT NULL,
	updateDate		 DATETIME,
	deleteFlag		 INT NOT NULL DEFAULT '0'
) 
