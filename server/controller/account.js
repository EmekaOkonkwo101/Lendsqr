const Account = require("../models/accountHelpers");

function transferMoney(req, res) {
    const data = ({ amount, reciever } = req.body);
    Account.transfer(req.params.id, data)
        .then((obj) => {
            res.status(200).json(obj);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
}

function depositMoney(req, res) {
    const data = ({ amount } = req.body);
    Account.deposit(req.params.id, data)
        .then((obj) => {
            res.status(200).json(obj);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
}

function viewTransactions(req, res) {
    Account.transactions(req.params.id)
        .then((obj) => {
            res.status(200).json(obj);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
}

function allAccounts(req, res) {
    Account.getAccounts()
        .then((obj) => {
            res.status(200).json(obj);
        })
        .catch((error) => {
            res.status(500).json({ message: error });
        });
}

function withdrawMoney(req, res) {
    Account.withdrawal()
        .then((obj) => {
            res.status(200).json(obj);
        })
        .catch((error) => {
            res.status(500).json({ message: error });
        });
}

module.exports = {
    transferMoney,
    depositMoney,
    viewTransactions,
    withdrawMoney,
    allAccounts,
};