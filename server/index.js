const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("Hello world");
});

const knex = require("knex")({
    client: "mysql",
    connection: async() => {
        const { token, tokenExpiration } = await someCallToGetTheToken();

        return {
            host: "127.0.0.1",
            port: 3306,
            user: "your_database_user",
            password: "your_database_password",
            database: "myapp_test",
            expirationChecker: () => {
                return tokenExpiration <= Date.now();
            },
        };
    },
});

app.use(knex);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});