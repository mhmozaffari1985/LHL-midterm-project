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
      .then(data => {
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
      .then(data => {
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
      .then(data => {
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  // GET/tasks/ redirects to GET/
  router.get("/", (req,res) => {
    res.redirect("/");
  });

  // GET/tasks/categories
  router.get("/categories", (req,res) => {
    res.render("categoryView");
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
