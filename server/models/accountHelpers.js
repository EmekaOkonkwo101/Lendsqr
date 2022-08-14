const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.staging);
const asyncHandler = require("express-async-handler");

transfer = asyncHandler(async(params) => {
    let account_check = await db("accounts").where("account_id", params);

    let user_check = await db("profile").where("id", account_check[0].profile_id);

    let receiver_check = await db("profile").where("number", reciever);

    let receiver_account = await db("accounts").where(
        "profile_id",
        receiver_check[0].id
    );
    if (!receiver_check[0] || !receiver_account[0]) {
        return "User not found";
    }

    if (account_check[0].balance < amount) {
        return "Cannot withdraw above account balance";
    } else {
        let remove = account_check[0].balance - amount;

        let add = receiver_account[0].balance + amount;

        await db("accounts")
            .where("account_id", params)
            .update({ balance: remove });
        await db("accounts")
            .where("profile_id", receiver_check[0].id)
            .update({ balance: add });
        await db("transactions").insert({
            account_id: params,
            number: user_check[0].number,
            type: "transfer",
            reciever: receiver_check[0].first_name,
        });
        return "Transfer sent successfully";
    }
});

deposit = asyncHandler(async(params) => {
    let account_check = await db("accounts").where("account_id", params);

    let user_check = await db("profile").where("id", account_check[0].profile_id);

    if (amount < 500) {
        return "You can only deposit from above N500";
    }

    if (!account_check[0]) {
        return "This account does not exist";
    } else {
        let add = account_check[0].balance + amount;
        await db("accounts").where("account_id", params).update({ balance: add });
        await db("transactions").insert({
            account_id: account_check[0].id,
            number: user_check[0].number,
            type: "deposit",
            reciever: user_check[0].first_name,
        });
        return "deposit successful";
    }
});

module.exports = {
    transfer,
    deposit,
};