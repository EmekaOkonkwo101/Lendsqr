// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "mysql",
        connection: {
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 3306,
        },
    },

    staging: {
        client: "mysql",
        connection: process.env.MYSQL_CONNECTION_STRING,
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
        connection: process.env.MYSQL_CONNECTION_STRING,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};