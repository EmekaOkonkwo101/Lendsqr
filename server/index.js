const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("Hello world");
});

app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});