/*
 * All routes for tasks are defined here
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const {addCategory} = require('../categories/taskCategory');

module.exports = (db) => {
  // POST/tasks/add route:
  router.post("/add", async (req, res) => {
    const autoCategory = await addCategory(req.body.task_title, req.body.task_desc);
    let queryString = `
      INSERT INTO tasks (task_title, task_description, user_id, status_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    let queryParams = [req.body.task_title, req.body.task_desc, req.session.userID, 1];
    // console.log(queryString, queryParams);

    db.query(queryString, queryParams)
      .then((data) => {
        let queryStringAutoCategory = `INSERT INTO task_category 
        (task_id, category_id) 
        VALUES ($1, $2)
        RETURNING *;`;
        let queryParamsAutoCategory = [data.rows[0].id,autoCategory];
        // console.log(queryStringAutoCategory, queryParamsAutoCategory);
        db.query(queryStringAutoCategory, queryParamsAutoCategory)
        .then((data1) => {          
          res.redirect('/');
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
        // res.redirect('/');
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
        SELECT * FROM tasks
        WHERE user_id = $1;
      `
      let queryParams = [userID];

      db.query(queryString, queryParams)
        .then((data) => {
          req.session.data = data.rows;
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

  // GET/tasks/:categoryName --> Sidebar!
  router.get("/:categoryName", (req,res) => {
    res.render(`${req.params.categoryName}`, req.session)
  })

  // Probably use this for scripts from sidebar
  router.post("/categories/delete/:id/:categoryId", (req, res) => {
    let queryString = `
      DELETE FROM task_category
      WHERE task_id = $1
      AND category_id = $2
      RETURNING *;
    `;
    let queryParams = [req.params.id, req.params.categoryId];
    // console.log(queryString);
    // console.log(queryParams);
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

  router.post("/categories/add/:id/:categoryId", (req, res) => {
    let queryString = `
    INSERT INTO task_category 
    (task_id, category_id) 
    VALUES ($1, $2)
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