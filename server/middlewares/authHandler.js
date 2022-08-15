const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.staging);

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };