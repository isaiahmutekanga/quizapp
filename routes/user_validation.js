const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /login
  router.get("/login", (req, res) => {
    const templateVars = { user: null };
    res.render("login", templateVars);
  });

  // GET /registration
  router.get("/register", (req, res) => {
    const templateVars = { user: null };
    res.render("/", templateVars);
  });

  return router;
};
