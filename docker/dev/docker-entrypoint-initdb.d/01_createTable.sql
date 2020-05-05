CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    nickname text NOT NULL,
    email text unique NOT NULL ,
    password text NOT NULL ,
    loginstatus boolean DEFAULT false
);