const express = require("express");
const router = express.Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

router.route("/").post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
