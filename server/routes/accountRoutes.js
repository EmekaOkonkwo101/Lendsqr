const express = require("express");
const {
    transferMoney,
    depositMoney,
    viewTransactions,
    allAccounts,
    withdrawMoney,
} = require("../controller/account");
const { protect } = require("../middlewares/authHandler");
const router = express.Router();

router.route("/transfer/:id").patch(protect, transferMoney);
router.route("/deposit/:id").patch(protect, depositMoney);
router.route("/transactions/:id").get(protect, viewTransactions);
router.route("/withdraw/:id").patch(protect, withdrawMoney);
router.route("/accounts").get(protect, allAccounts);

module.exports = router;