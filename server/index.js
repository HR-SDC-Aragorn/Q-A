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
                'photos', (SELECT json_agg(photos.url) from photos WHERE answer_id = answers.id)
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
            'photos', (SELECT json_agg(photos.url) FROM photos WHERE answer_id = answers.id)
          )
        ) FROM answers WHERE question_id = ${req.params.question_id})
      )`
  )
  .then((results) => {
    res.send(results.rows[0].json_build_object);
  })
});

// app.post('/qa/questions', (req, res) => {

// });

// app.post('/qa/questions/:question_id/answers', (req, res) => {

// });

// app.put('/qa/questions/:question_id/helpful', (req, res) => {

// });

// app.put('/qa/questions/:question_id/report', (req, res) => {

// });

// app.put('/qa/answers/:answer_id/helpful', (req, res) => {

// });

// app.put('/qa/answers/:answer_id/report', (req, res) => {

// });


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
})


// NEED EMPTY ARRAY IN PHOTOS WHERE THERE ARE NO PHOTOS