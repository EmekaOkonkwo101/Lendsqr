const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

app.use(express.json());

app.get("/api", function(req, res) {
    res.send("Hello world");
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});