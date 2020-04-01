CREATE TABLE users(
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255) ,
    date_create DATE

);

CREATE TABLE articles(
    pid SERIAL PRIMARY KEY,
    title VARCHAR(255),
    body VARCHAR ,
    user_id INT REFERENCES users(uid),
    author VARCHAR  REFERENCES users(username),
    date_created TIMESTAMP

);

CREATE TABLE comments(
    cid SERIAL PRIMARY KEY,
    comment VARCHAR,
    user_id INT REFERENCES users(uid),
    author VARCHAR  REFERENCES users(username),
    comment_id INT REFERENCES articles(pid),
    date_created TIMESTAMP
    

);
CREATE TABLE gifs (
    gid SERIAL PRIMARY KEY,
    gif_url VARCHAR ,
    user_id INT REFERENCES users(uid),
    date_created TIMESTAMP

);