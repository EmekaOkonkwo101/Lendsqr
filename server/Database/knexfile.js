// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "mysql",
        connection: {
            connectionaLimit: 50,
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 3306,
        },
        acquireConnectionTimeout: 10000,
    },

    staging: {
        client: "mysql",
        ssl: true,
        connection: {
            connectionaLimit: 50,
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 3306,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "mysql",
        connection: {
            connectionaLimit: 50,
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 3306,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};