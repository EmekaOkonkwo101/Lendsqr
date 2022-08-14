const express = require("express");
const {
    createNewUser,
    allUsers,
    deleteNewUser,
} = require("../controller/users");
const router = express.Router();

router.route("/create").post(createNewUser);
router.route("/users").get(allUsers);
router.route("/delete/:id").delete(deleteNewUser);

module.exports = router;