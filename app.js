/* eslint-disable camelcase */

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');


const app = express();
pool.connect()
  .then(() => {
    console.log('Successfully connected to postgres');
  })
  .catch((error) => {
    console.log('Unable to connect to postgres');
    console.error(error);
  });
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());


// eslint-disable-next-line spaced-comment
app.get('/api/get/allarticles', (req, res, next) => {
  const text = 'SELECT * FROM articles ORDER BY date_create';
  pool.query(text).then(
    () => {
      res.status(201).send({
        message: 'articles served',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});

app.post('/api/post/article', (req, res, next) => {
  const text = 'INSERT INTO articles(title, body, user_id, author, date_create) VALUES($1, $2, $3, $4, NOW()) ';
  const values = [req.body.title, req.body.body, req.body.uid, req.body.username];
  pool.query(text, values).then(
    () => {
      res.status(201).json({
        message: 'articles posted',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});

app.put('/api/put/articles', (req, res, next) => {
  const text = ' UPDATE articles SET title = $1, body= $2, user_id = $3, author = $5, date_create=NOW() WHERE pid = $4 ';
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username];
  pool.query(text, values).then(
    () => {
      res.status(201).json({
        message: 'articles updated',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});
// delete article first delete comment associated with a post
app.delete('/api/delete/articlecomment', (req, res, next) => {
  const comment_id = [req.body.comment_id];
  pool.query('DELETE FROM comments WHERE comment_id = $1 ', comment_id).then(
    () => {
      res.status(201).json({
        message: 'comment deleted',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});

app.delete('/api/delete/article', (req, res, next) => {
  const comment_id = [req.body.comment_id];
  pool.query('DELETE FROM articles WHERE pid = $1 ', comment_id).then(
    () => {
      res.status(201).json({
        message: 'article deleted',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});
// comment api post, put, delete
app.post('/api/post/comment', (req, res, next) => {
  const text = 'INSERT INTO comments(comment, user_id, author, comment_id, date_created) VALUES($1, $2, $3, $4, NOW()) ';
  const values = [req.body.comment, req.body.uid, req.body.username, req.body.comment_id];
  pool.query(text, values).then(
    () => {
      res.status(201).json({
        message: 'comment posted',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});


app.delete('/api/delete/onlycomment', (req, res, next) => {
  const { comment_id } = req.body;
  pool.query('DELETE FROM comments WHERE comment_id = $1 ', [comment_id]).then(
    () => {
      res.status(201).json({
        message: 'only comment deleted',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});

// gif api
app.get('/api/get/allgif', (req, res, next) => {
  const text = 'SELECT * FROM gifs ORDER BY date_created';
  pool.query(text).then(
    () => {
      res.status(201).json({
        message: 'allgifs served',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});

app.post('/api/post/gifs', (req, res, next) => {
  const text = 'INSERT INTO gifs(gif_url, user_id, date_created) VALUES($1, $2, NOW()) ';
  const values = [req.body.gifs_url, req.body.uid];
  pool.query(text, values).then(
    () => {
      res.status(201).json({
        message: 'gif posted',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});
app.post('/api/post/users', (req, res, next) => {
  const password = bcrypt.hashSync('goiu', 10);
  const text = 'INSERT INTO users(username, password, date_create) VALUES($1, $2, NOW())';
  const values = ['sensoen', password];
  pool.query(text, values).then(
    () => {
      res.status(201).json({
        message: 'User added successfully!'
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
});
app.get('/api/get/users',(req, res, next) => {
  const text = 'SELECT * FROM users WHERE username = $1'
  //const values = ['sensoen']
  pool.query(text, 'seu')
  .then(
      ({rows}) => {

        if (!rows[0]) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare('goiu', row.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            const token = jwt.sign(
            {userId:row._id},
            'random-token-secret',
            {expiresIn: '24'}
            );
            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    )
});
module.exports = app;
