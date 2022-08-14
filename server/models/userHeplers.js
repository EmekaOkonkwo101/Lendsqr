const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.staging);
const asyncHandler = require("express-async-handler");

createUser = asyncHandler(async() => {
    const number = Math.floor(Math.random() * 1000000000);
    const [id] = await db("profile").insert({
        first_name: first_name,
        last_name: last_name,
        number: number,
    });

    await db("accounts").insert({ profile_id: id });

    return {
        id,
        first_name,
        last_name,
        number,
    };
});

deleteUser = asyncHandler(async(params) => {
    await db("profile").where("id", params).del();

    return "user deleted";
});

getUsers = asyncHandler(async() => {
    return db("accounts");
});

module.exports = {
    createUser,
    getUsers,
    deleteUser,
};