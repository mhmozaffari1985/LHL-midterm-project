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
    if (req.session.userID) {
      console.log(req.session.userID)
      res.redirect('/');
    } else {
      res.render('login');
    }
  });

  // POST /users/login -> create logged in user cookie
  router.post('/login', (req, res) => {
    // Extract relevant data
    const { email, password } = req.body;

    let queryString = `
      SELECT * FROM users
      WHERE email = $1
      AND password = $2;
    `
    let queryParams = [email, password];

    // console.log(queryString, queryParams);
    db.query(queryString, queryParams)
      .then((data) => {
        if (data.rows.length) {
          req.session.userID = data.rows[0].id;
          res.redirect('/');
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
  return router;
};
