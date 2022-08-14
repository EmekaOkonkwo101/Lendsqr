const Users = require("../models/userHeplers");

function createNewUser(req, res) {
    const data = ({ first_name, last_name } = req.body);
    Users.createUser(data)
        .then((obj) => {
            res.status(200).json(obj);
        })
        .catch((error) => {
            res.status(500).json({ message: error });
        });
}

function deleteNewUser(req, res) {
    Users.deleteUser(req.params.id)
        .then((obj) => {
            res.status(200).json(obj);
        })
        .catch((error) => {
            res.status(500).json({ message: error });
        });
}

function allUsers(req, res) {
    Users.getUsers()
        .then((obj) => {
            res.status(200).json(obj);
        })
        .catch((error) => {
            res.status(500).json({ message: error });
        });
}

module.exports = { createNewUser, allUsers, deleteNewUser };