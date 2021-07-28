/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');

module.exports = (db) => {
  // GET /users/login -> render login page
  router.get('/login', (req, res) => {
    const userID = req.session.userID;
    if (userID) {
      res.redirect('/tasks');
    } else {
      res.render('login');
    }
  });

  // GET /users/register -> render register page
  router.get('/register', (req, res) => {
    const userID = req.session.userID;
    if (userID) {
      res.redirect('/tasks');
    } else {
      res.render('register');
    }
  })

  // POST /users/login -> create logged in user cookie
  router.post('/login', (req, res) => {
    // Extract relevant data
    const { email, password } = req.body;

    let queryString = `
      SELECT * FROM users
      WHERE email = $1;
    `
    let queryParams = [email];

    // console.log(queryString, queryParams);
    db.query(queryString, queryParams)
      .then((data) => {
        console.log(bcrypt.hashSync(password, 10));
        if (bcrypt.compareSync(password, data.rows[0].password)) {
          req.session.userID = data.rows[0].id;
          res.redirect('/tasks');
        } else {
          res.send('<script>alert("Your credential is not valid!"); window.location.href = "/users/login";</script>')
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      })
  })

  // POST /users/logout -> clear the cookie session
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/users/login');
  })

  // POST /users/register -> register user
  router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    let selectString = `
      SELECT * FROM users
      WHERE name = $1 OR email = $2
    `;
    let insertString = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    let selectParams = [name, email];
    let insertParams = [name, email, bcrypt.hashSync(password, 10)];

    db.query(selectString, selectParams)
      .then((data) => {
        if (data.rows.length) {
          res.send('<script>alert("You already have an account!"); window.location.href = "/users/register";</script>')
        } else {
          db.query(insertString, insertParams)
            .then((data) => {
              console.log(data.rows);
              req.session.userID = data.rows[0].id;
              res.render('index', data.rows[0]);
            })
            .catch((err) => {
              res
                .status(500)
                .json({ error: err.message });
            })
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      })
  })

  return router;
};
