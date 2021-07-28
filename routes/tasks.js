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
    `;
    let queryParams = [req.body.task_title, req.body.task_desc, 1, 1];
    // console.log(queryString, queryParams);

    db.query(queryString, queryParams)
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // POST /tasks/:id route (DELETE):
  router.post("/:id", (req, res) => {
    // console.log(req.params.id);
    let queryString = `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *;
    `;
    let queryParams = [req.params.id];
    // console.log(queryString, queryParams);

    db.query(queryString, queryParams)
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  })

  // POST tasks/status/:id route (status update):
  router.post("/status/:id", (req, res) => {
    let queryString = `
      UPDATE tasks
      SET status_id = 2
      WHERE id = $1
      RETURNING *;
    `;
    let queryParams = [req.params.id];
    
    db.query(queryString, queryParams)
      .then(() => {
        res.json({ success: true});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  // POST tasks/update/:id route (edit task description):
  router.post("/update/:id", (req, res) => {
    let data;
    let queryString = `
      UPDATE tasks
    `
    if (req.body.task_description) {
      data = req.body.task_description;
      queryString += `SET task_description = $1`;
    } 
    if (req.body.task_title) {
      data = req.body.task_title;
      queryString += `SET task_title = $1`;
    }
    
    queryString += `
      WHERE id = $2
      RETURNING *;
    `
    let queryParams = [data, req.params.id];

    // console.log(queryString, queryParams);
    db.query(queryString, queryParams)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  // GET/tasks/ redirects to GET/
  router.get("/", (req,res) => {
    // if the users is logged in
    const userID = req.session.userID;
    if (userID) {
      let queryString = `
        SELECT * FROM users
        WHERE id = $1;
      `
      let queryParams = [userID];

      db.query(queryString, queryParams)
        .then((data) => {
          res.render("index", req.session);
        })
        .catch(err => {
          res
          .status(500)
          .json({ error: err.message });
        })
    } else {
      res.redirect('/users/login');
    }
  });

  // GET/tasks/categories
  router.get("/categories", (req,res) => {
    res.render("categoryView", req.session);
  });

  router.post("/categories/delete/:id/:categoryId", (req, res) => {
    let queryString = `
      DELETE FROM task_category      
      WHERE task_id = $1
      AND category_id = $2
      RETURNING *;
    `;
    let queryParams = [req.params.id, req.params.categoryId];
    console.log(queryString);
    console.log(queryParams);
    db.query(queryString, queryParams)
      .then(data => {
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  return router;

};
