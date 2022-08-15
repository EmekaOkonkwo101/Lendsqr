const express = require("express");
const {
    createNewUser,
    allUsers,
    deleteNewUser,
    token,
} = require("../controller/users");
const router = express.Router();
const { protect } = require("../middlewares/authHandler");

router.route("/create").post(protect, createNewUser);
router.route("/users").get(protect, allUsers);
router.route("/delete/:id").delete(protect, deleteNewUser);
router.route("/token").get(token);

module.exports = router;