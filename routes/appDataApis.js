/*
 * All routes for database query generated APIs are here.
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GET/apis/tasks
  router.get("/tasks", (req, res) => {
    let query = `SELECT tasks.*, users.name AS user_name, users.email, statuses.name AS status_name,
    categories.id  AS category_id, categories.name AS category_name
    FROM tasks
    LEFT JOIN task_category ON tasks.id = task_category.task_id
    LEFT JOIN categories ON task_category.category_id  = categories.id
    LEFT JOIN statuses ON statuses.id  = tasks.status_id
    LEFT JOIN users ON tasks.user_id = users.id`;
    console.log(query);
    db.query(query)
      .then(data => {
        const tasks = data.rows;
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET/apis/users
  router.get("/users", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET/api/categories/tasks

  router.get("/categories", (req,res) => {
    db.query(`SELECT * FROM categories;`)
    .then(data => {
      const categories = data.rows;
      res.json({categories});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })


  return router;
};
