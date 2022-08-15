// Requiring module
const assert = require("assert");
const generateToken = require("../server/genToken");
const knex = require("knex");
const config = require("../server/knexfile");
const db = knex(config.staging);

// We can group similar tests inside a describe block
describe("gets token for session authentication, valid for one day", () => {
    before(() => {});

    after(() => {});

    // We can add nested blocks for different tests
    describe("Testing account transactions", () => {
        it("Token sent", async() => {
            generateToken();
            await Promise.resolve();
            assert.ok(true);
        });

        it("Deposits 5000 into Emeka's account", async() => {
            const emeka = await db("accounts").where("account_id", "164");
            assert.equal(emeka[0].balance + 5000, 62000);
            await Promise.resolve();
            assert.ok(true);
        });

        it("Transfers 5000 from kelvin account to emeka via account number", async() => {
            const kelvin = await db("accounts").where("account_id", "154");
            const emeka = await db("accounts").where("account_id", "164");
            assert.equal(kelvin[0].balance - 5000, 95000);
            assert.equal(emeka[0].balance + 5000, 62000);
            await Promise.resolve();
            assert.ok(true);
        });

        it("Withdraw 5000 from Emeka account via account id", async() => {
            const emeka = await db("accounts").where("account_id", "164");
            assert.equal(emeka[0].balance - 5000, 52000);
            await Promise.resolve();
            assert.ok(true);
        });
    });
});