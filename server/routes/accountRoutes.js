const express = require("express");
const { transferMoney, depositMoney } = require("../controller/account");
const router = express.Router();

router.route("/transfer/:id").post(transferMoney);
router.route("/deposit/:id").post(depositMoney);
// router.route("/delete/:id").delete(deleteNewUser);

module.exports = router;