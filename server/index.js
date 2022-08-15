const dotenv = require("dotenv");
const express = require("express");
const app = express();
const userRoutes = require("../server/routes/userRoute");
const accountRoutes = require("../server/routes/accountRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

dotenv.config();

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", accountRoutes);

const PORT = 5000;

app.use(errorHandler);

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});