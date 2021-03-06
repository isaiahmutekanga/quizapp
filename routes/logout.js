const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // POST /logout/
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect(`/`); 
  })

  return router;
};
