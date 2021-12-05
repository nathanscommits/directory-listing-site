const express = require("express"),
  router = express.Router();
const postController = require("./controllers/post_controller");
const userController = require("./controllers/user_controller");
// const authController = require("./controllers/auth_controller");

router.get("/", userController.home);
router.post("/add-online", postController.addOnline);
router.post("/create-order", postController.createOrder);

module.exports = router;
