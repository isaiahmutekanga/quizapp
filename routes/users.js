/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /users/creator/:user_id
  router.get("/creator/:user_id", (req, res) => {
    const userid = req.session.userid;
    if (!userid){
      return res.redirect("/");
    } else if (userid != req.params.user_id) { 
      return res.redirect("/");
    }

    db.query(`SELECT * FROM quizzes WHERE user_id = $1 ORDER BY id;`, [userid])
    .then(data => {
      let templateVars = {quizzes: data.rows, userInfo: req.session.user};
      res.render("profile_user", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  // GET /users/:user_id/:quiz_id  --> Quiz Result Page
  router.get("/:user_id/:quiz_id", (req, res) => {
  
    db.query(`
      SELECT attempts.*, quizzes.id AS thequizid, quizzes.title AS title
      FROM attempts 
      JOIN quizzes ON attempts.quiz_id = quizzes.id
      WHERE attempts.user_id = $1 AND attempts.quiz_id = $2
      ORDER BY attempts.id DESC
      ;`, [req.params.user_id, req.params.quiz_id])
    .then(data => {
      if (req.session.user) {
        let templateVars = {
          correct: data.rows[0].correct,
          total: data.rows[0].total,
          title: data.rows[0].title,
          userInfo: req.session.user,
          quiz_id: req.params.quiz_id
        };
        res.render("profile_user_result", templateVars);
      } else {
        let templateVars = {
          correct: data.rows[0].correct,
          total: data.rows[0].total,
          title: data.rows[0].title,
          userInfo: null,
          quiz_id: req.params.quiz_id
        };
        res.render("profile_user_result", templateVars);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  return router;
};
