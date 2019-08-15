USE `codeline`;

INSERT INTO user (
	id,
	email,
	firstName,
	lastName,
	birth,
	telephone,
	zipcode,
	country,
	state,
	city,
	address,
	number,
	complement
) VALUES (
	0,
	'email@gmail.com',
    'Gabriel',
    'Ribeiro',
    NOW(),
    '+5511973756450',
    '05145-200',
    'Brasil',
    'SP',
    'São Paulo',
    'Av. Brasil',
    3363,
    'Apt 31 Bl 2'
);

INSERT INTO seller (id, userId) VALUES (0, 1);

INSERT INTO login (
	email,
    password
) VALUES (
	'email@gmail.com',
    '123@gab@456'
);

SELECT * FROM user;

SELECT * from login;

select * from codeline.seller;

