/*
 * All routes for tasks are defined here
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // POST/tasks/add route:
  router.post("/add", (req, res) => {
    let queryString = `
      INSERT INTO tasks (task_title, task_description, user_id, status_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `
    let queryParams = [req.body.task_title, req.body.task_desc, 1, 1];
    console.log(queryString, queryParams);

    db.query(queryString, queryParams)
      .then(data => {
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;

};
