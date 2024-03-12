const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/library", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/users", require("./routes/users"));

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res
        .status(err.statusCode || 500)
        .send(err.message || "Internal Server Error");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});