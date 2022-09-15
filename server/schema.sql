CREATE TABLE questions (
  id serial PRIMARY KEY,
  product_id serial,
  body VARCHAR(1000),
  date_written TIMESTAMP,
  asker_name VARCHAR(60),
  asker_email VARCHAR (60),
  reported BOOLEAN,
  helpful INT NOT NULL
);

CREATE TABLE answers (
  id serial PRIMARY KEY,
  question_id serial references questions(id),
  body VARCHAR(1000),
  date_written TIMESTAMP,
  answerer_name VARCHAR(60),
  answerer_email VARCHAR(60),
  reported BOOLEAN,
  helpful INT NOT NULL
);

CREATE TABLE photos (
  id serial,
  answer_id serial references answers(id),
  url VARCHAR(250)
);