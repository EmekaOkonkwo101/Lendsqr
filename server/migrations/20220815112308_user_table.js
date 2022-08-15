/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("users", function(table) {
            table.increments("id").primary();
            table.string("first_name", 255).notNullable();
            table.string("last_name", 255).notNullable();
            table.string("middle_name", 255).nullable();
            table.integer("number").index().notNullable();
        })
        .createTable("accounts", function(table) {
            table.increments("account_id").primary();
            table.integer("users_id").references("id");
            table.decimal("balance").notNullable().defaultTo(0.0);
        })
        .raw("ALTER TABLE accounts AUTO_INCREMENT = 150")
        .createTable("transactions", function(table) {
            table.increments("transaction_id").primary();
            table.integer("account_id").references("account_id");
            table.integer("number").notNullable();
            table.string("type").notNullable();
            table.integer("amount");
            table.integer("session_id");
            table.string("reciever");
            table.string("sender");
            table.timestamps(true, true);
        })
        .raw("ALTER TABLE transactions AUTO_INCREMENT = 10000");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("accounts")
        .dropTableIfExists("transactions")
        .dropTableIfExists("users");
};