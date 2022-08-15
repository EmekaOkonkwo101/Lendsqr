const express = require("express");
const {
    transferMoney,
    depositMoney,
    viewTransactions,
    allAccounts,
} = require("../controller/account");
const { protect } = require("../middlewares/authHandler");
const router = express.Router();

router.route("/transfer/:id").post(protect, transferMoney);
router.route("/deposit/:id").post(protect, depositMoney);
router.route("/transactions/:id").get(protect, viewTransactions);
router.route("/accounts").get(protect, allAccounts);

module.exports = router;