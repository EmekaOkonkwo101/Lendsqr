/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("profile", function(table) {
            table.increments();
            table.string("first_name", 255).notNullable();
            table.string("last_name", 255).notNullable();
            table.string("middle_name", 255).nullable();
            table.integer("number").index().notNullable();
        })
        .createTable("accounts", function(table) {
            table.increments("account_id");
            table.integer("profile_id").unsigned().references("id");
            table.decimal("balance").notNullable().defaultTo(0.0);
        })
        .createTable("transactions", function(table) {
            table.increments("transaction_id");
            table.integer("account_id").references("account_id");
            table.integer("number").notNullable();
            table.integer("type").notNullable();
            table.integer("amount");
            table.string("reciever");
            table.timestamps(true, true);
        });
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