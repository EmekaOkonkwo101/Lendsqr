const express = require("express");
const {
    transferMoney,
    depositMoney,
    viewTransactions,
    allAccounts,
} = require("../controller/account");
const router = express.Router();

router.route("/transfer/:id").post(transferMoney);
router.route("/deposit/:id").post(depositMoney);
router.route("/transactions/:id").get(viewTransactions);
router.route("/accounts").get(allAccounts);

module.exports = router;