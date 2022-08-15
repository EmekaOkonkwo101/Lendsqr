const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.staging);
const asyncHandler = require("express-async-handler");

transfer = asyncHandler(async(params) => {
    let account_check = await db("accounts").where("account_id", params);

    if (!account_check[0]) {
        return "User not found";
    }

    let user_check = await db("users").where("id", account_check[0].users_id);

    let receiver_check = await db("users").where("number", reciever);

    if (!receiver_check[0]) {
        return "Reciever not found";
    }

    let receiver_account = await db("accounts").where(
        "users_id",
        receiver_check[0].id
    );

    if (!reciever) {
        return "Please enter a receiver account number";
    }

    if (account_check[0].balance < amount) {
        return "Cannot transfer above account balance";
    } else {
        let remove = account_check[0].balance - amount;

        let add = receiver_account[0].balance + amount;

        await db("accounts")
            .where("account_id", params)
            .update({ balance: remove });
        await db("accounts")
            .where("users_id", receiver_check[0].id)
            .update({ balance: add });
        let account_id = account_check[0];
        let session = Math.floor(Math.random() * 1000000000000000);
        await db("transactions").insert({
            account_id: account_id.account_id,
            number: user_check[0].number,
            type: "transfer",
            session_id: session,
            reciever: receiver_check[0].first_name,
        });
        let receiver_id = receiver_account[0];
        await db("transactions").insert({
            account_id: receiver_id.account_id,
            number: user_check[0].number,
            type: "credit transfer",
            session_id: session,
            sender: account_check[0].first_name,
        });
        return `You have successfully transferred ${amount} to ${receiver_check[0].first_name}`;
    }
});

withdrawal = asyncHandler(async(params) => {
    let account_check = await db("accounts").where("account_id", params);

    if (!account_check[0]) {
        return "User not found";
    }

    if (account_check[0].balance < amount) {
        return "Cannot withdraw above account balance";
    } else {
        let remove = account_check[0].balance - amount;
        await db("accounts")
            .where("account_id", params)
            .update({ balance: remove });

        let account_id = account_check[0];
        let session = Math.floor(Math.random() * 1000000000000000);
        await db("transactions").insert({
            account_id: account_id.account_id,
            number: user_check[0].number,
            type: "withdrawal",
            session_id: session,
            reciever: account_check[0].first_name,
        });
        return `You have successfully transferred ${amount} to ${receiver_check[0].first_name}`;
    }
});

deposit = asyncHandler(async(params) => {
    let account_check = await db("accounts").where("account_id", params);

    if (!account_check[0]) {
        return "User not found";
    }

    let user_check = await db("users").where("id", account_check[0].users_id);

    if (amount < 500) {
        return "You can only deposit from above N500";
    }

    if (!account_check[0]) {
        return "This account does not exist";
    } else {
        let add = account_check[0].balance + amount;
        let account_id = account_check[0];
        await db("accounts").where("account_id", params).update({ balance: add });
        let session = Math.floor(Math.random() * 1000000000000000);
        await db("transactions").insert({
            account_id: account_id.account_id,
            number: user_check[0].number,
            type: "deposit",
            amount: amount,
            session_id: session,
            reciever: user_check[0].first_name,
        });
        return `You successfully deposited ${amount} to your account`;
    }
});

transactions = asyncHandler(async(params) => {
    let account_check = await db("transactions").where("account_id", params);

    if (!account_check[0]) {
        return "User has no transaction to display";
    } else {
        return account_check;
    }
});

getAccounts = asyncHandler(async() => {
    return db("accounts");
});

module.exports = {
    transfer,
    deposit,
    transactions,
    getAccounts,
};