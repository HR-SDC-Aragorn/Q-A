CREATE DATABASE qa;

\c qa;

CREATE TABLE questions (
  question_id serial PRIMARY KEY,
  product_id serial,
  question_body VARCHAR(1000),
  question_date BIGINT,
  asker_name VARCHAR(60),
  asker_email VARCHAR (60),
  reported BOOLEAN,
  question_helpfulness INT NOT NULL
);

CREATE TABLE answers (
  id serial PRIMARY KEY,
  question_id serial references questions(question_id),
  body VARCHAR(1000),
  date BIGINT,
  answerer_name VARCHAR(60),
  answerer_email VARCHAR(60),
  reported BOOLEAN,
  helpfulness INT NOT NULL
);

CREATE TABLE photos (
  id serial,
  answer_id serial references answers(id),
  url VARCHAR(250)
);