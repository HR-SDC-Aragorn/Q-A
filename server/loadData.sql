\COPY questions FROM data/questions.csv DELIMITER ',' CSV HEADER;

\COPY answers FROM data/answers.csv DELIMITER ',' CSV HEADER;

\COPY photos FROM data/answers_photos.csv DELIMITER ',' CSV HEADER;

-- QUESTIONS --
-- DATA FROM CSV id,product_id,body,date_written,asker_name,asker_email,reported,helpful
-- API FORMAT product_id, question_id, question_body, question_date, asker_name, question_helpfulness, reported

ALTER TABLE questions DROP COLUMN asker_email;

-- ANSWERS --
-- DATA FROM CSV id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
-- API FORMAT question_id, id, body, date, answerer_name, helpfulness

ALTER TABLE answers DROP COLUMN answerer_email;
ALTER TABLE answers DROP COLUMN reported;

-- PHOTOS --
-- DATA FROM CSV id,answer_id,url
-- API FORMAT answers_id, url

