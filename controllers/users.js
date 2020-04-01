const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

exports.signup = (req, res, next) => {
  // const password = bcrypt.hash(req.body.passwords, 10);
  const text = 'INSERT INTO users(username password) VALUES($1, $2 NOW()) ';
  const values = [req.body.username, req.body.password];
  pool.query(text, values).then(
    () => {
      res.status(201).json({
        message: 'User added successfully!',
      });
    },
  ).catch(
    (error) => {
      res.status(500).json({
        error,
      });
    },
  );
};
/* );
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!'),
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!'),
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'random-token-secret',
            { expiresIn: '24' },
          );
          res.status(200).json({
            userId: user._id,
            token,
          });
        },
      ).catch(
        (error) => {
          res.status(500).json({
            error,
          });
        },
      );
    },
  ).catch(
    (error) => {
      res.status(500).json({
        error,
      });
    },
  );
}; */
