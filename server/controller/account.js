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

module.exports = {
    transferMoney,
    depositMoney,
};