const express = require('express');
const pool = require('./db.js');
const app = express();
const port = 3000;
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());


// app.get('/api/time', (req, res) => {
//   pool.query('SELECT NOW() as now')
//   .then(res => console.log(res.rows[0]))
//   .catch(e => console.error(e.stack))
//   .finally(() => {res.sendStatus(200)})
// });

app.get('/qa/questions', (req, res) => {
  //console.log(req.query.product_id);
  pool.query(
    `SELECT
      json_build_object(
        'product_id', ${req.query.product_id},
        'results', (SELECT json_agg(
          json_build_object(
            'question_id', question_id,
            'question_body', question_body,
            'question_date', question_date,
            'asker_name', asker_name,
            'question_helpfulness', question_helpfulness,
            'reported', reported,
            'answers', (SELECT json_object_agg(
              id, json_build_object(
                'id', id,
                'body', body,
                'date', date,
                'answerer_name', answerer_name,
                'helpfulness', helpfulness,
                'photos', (SELECT COALESCE (json_agg(photos.url), '[]'::json) FROM photos WHERE answer_id = answers.id)
                )) from answers WHERE question_id = questions.question_id)
        )) from questions WHERE product_id = ${req.query.product_id})
      )`
  )
  .then((results) => {
    res.send(results.rows[0].json_build_object);
  })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  console.log(req.query);
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  pool.query(
    `SELECT
      json_build_object(
        'question', ${req.params.question_id},
        'page', ${page},
        'count', ${count},
        'results', (SELECT json_agg(
          json_build_object(
            'answer_id', id,
            'body', body,
            'date', date,
            'answerer_name', answerer_name,
            'helpfulness', helpfulness,
            'photos', (SELECT COALESCE (json_agg(photos.url), '[]'::json) FROM photos WHERE answer_id = answers.id)
          )
        ) FROM answers WHERE question_id = ${req.params.question_id})
      )`
  )
  .then((results) => {
    res.send(results.rows[0].json_build_object);
  })
});

app.post('/qa/questions', (req, res) => {
  console.log(req.body);
  const params = [req.body.product_id, req.body.body, req.body.name, req.body.email, 0, 0];
  const queryStr = `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, to_timestamp(${Date.now()/1000}), $3 ,$4, $5, $6)`
  pool.query(queryStr, params)
  .then(() => {
    res.sendStatus(201);
  })
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log("req.params.question_id", req.params.question_id);
  console.log("req.body", req.body);
  const params = [req.params.question_id, req.body.body, req.body.name, req.body.email, 0, 0];
  const queryStr = `INSERT INTO answers (question_id, body, date, answerer_name, answerer_email, reported, helpfulness) VALUES ($1, $2, to_timestamp(${Date.now()/1000}), $3, $4, $5, $6) RETURNING id`;
  pool.query(queryStr, params)
  .then((result) => {
    console.log(result.rows[0].id);
    const photos = [result.rows[0].id, req.body.photos];
    const queryStrPhotos = `INSERT INTO photos (answer_id, url) VALUES ($1, $2)`;
    pool.query(queryStrPhotos, photos)
    .then(() => {
      res.sendStatus(201);
    })
  })
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  console.log("req.params.question_id", req.params.question_id);
  pool.query(`UPDATE questions SET question_helpfulness = question_helpfulness+1 WHERE question_id = ${req.params.question_id}`)
  .then(() => {
    res.sendStatus(204);
  })
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  console.log("req.params.question_id", req.params.question_id);
  pool.query(`UPDATE questions SET reported = '1' WHERE question_id = ${req.params.question_id}`)
  .then(() => {
    res.sendStatus(204);
  })
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log("req.params.question_id", req.params.question_id);
  pool.query(`UPDATE answers SET helpfulness = helpfulness+1 WHERE id = ${req.params.answer_id}`)
  .then(() => {
    res.sendStatus(204);
  })
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  console.log("req.params.question_id", req.params.question_id);
  pool.query(`UPDATE answers SET reported = '1' WHERE id = ${req.params.answer_id}`)
  .then(() => {
    res.sendStatus(204);
  })
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
})
