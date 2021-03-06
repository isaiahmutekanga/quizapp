const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // POST /status/
  router.post("/:user_id", (req, res) => {
    if (!req.session.userid){
      return res.redirect("/");
    } else if (req.session.userid != req.params.user_id) { 
      return res.redirect("/");
    }
    let num = Number(req.body.privacy_status);
    let id = 0;
    let privacy = null;
    if (num > 0) {
      id = num;
      privacy = true;
    } else if (num < 0) {
      id = num * -1;
      privacy = false
    }

    db.query(`
    UPDATE quizzes
    SET privacy = $1 
    WHERE quizzes.id = $2
    ;`, [privacy, id])
    .then((data) => {
      console.log(data.rows)
      res.redirect(`/users/creator/${req.session.userid}`);
    })
    .catch((err) => {
      res.redirect(`/`);
    });
  })

  return router;
};
