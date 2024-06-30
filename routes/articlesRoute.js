const express = require("express");
const router = express.Router();

const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} = require("../controller/articleController.js");

router.route("/").post(createArticle).get(getArticles);
router.route("/:id").get(getArticle).patch(updateArticle).delete(deleteArticle);

module.exports = router;
