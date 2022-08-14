// Update with your config settings.
require("dotenv").config({ path: "../.env" });
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    staging: {
        client: "mysql",
        connection: "mysql://b2e4654c2e067f:4540346b@us-cdbr-east-06.cleardb.net/heroku_4ced1f65fd673b8?reconnect=true",
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