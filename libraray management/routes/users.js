const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send("Username already exists");
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send("Error creating user");
    }
});

// Sign in (login) an existing user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send("Invalid username or password");
        }

        if (user.password === password) {
            const token = "your_temporary_token";
            res.json({ token });
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        res.status(500).send("Error logging in");
    }
});

module.exports = router;