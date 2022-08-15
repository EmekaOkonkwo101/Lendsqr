const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.staging);
const asyncHandler = require("express-async-handler");
const generateToken = require("../genToken");

createUser = asyncHandler(async() => {
    const number = Math.floor(Math.random() * 1000000000);
    const [id] = await db("users").insert({
        first_name: first_name,
        last_name: last_name,
        number: number,
    });

    await db("accounts").insert({ users_id: id });

    return {
        id,
        first_name,
        last_name,
        number,
    };
});

deleteUser = asyncHandler(async(params) => {
    let account = await db("accounts").where("users_id", params);

    if (account[0]) {
        let transactions = await db("transactions").where(
            "account_id",
            account[0].account_id
        );

        if (transactions[0]) {
            await db("transactions").where("account_id", account[0].account_id).del();
        }
    }

    if (account[0]) {
        await db("accounts").where("users_id", params).del();
    }

    await db("users").where("id", params).del();

    return "user data deleted";
});

getUsers = asyncHandler(async() => {
    return db("users");
});

getToken = asyncHandler(async() => {
    return generateToken();
});

module.exports = {
    getToken,
    createUser,
    getUsers,
    deleteUser,
};