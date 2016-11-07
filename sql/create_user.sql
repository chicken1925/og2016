CREATE TABLE user_M (
	PRIMARY KEY( id ),
	id				 INT NOT NULL AUTO_INCREMENT  ,
	uid				 TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    name             TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    password         TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    faculty          TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    department       TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    money            INT NOT NULL DEFAULT '0',
    level            INT NOT NULL DEFAULT '0',
    student1         INT NOT NULL DEFAULT '0',
    student2         INT NOT NULL DEFAULT '0',
    student3         INT NOT NULL DEFAULT '0',
    student4         INT NOT NULL DEFAULT '0',
    student5         INT NOT NULL DEFAULT '0',
    student6         INT NOT NULL DEFAULT '0',
    save_t           INT NOT NULL DEFAULT '0',
	insertDate		 DATETIME  NOT NULL,
	updateDate		 DATETIME,
	deleteFlag		 INT NOT NULL DEFAULT '0'
)

ALTER TABLE user_M ADD (
    item_param       TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci ,
    item_skill       TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci
);
ALTER TABLE user_M MODIFY (
    save_t    TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci
);
ALTER TABLE user_M ADD (
    respawn_t    TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci
);
