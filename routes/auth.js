const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
    const {email, password} = req.body;


    if (!email || !password) {
        return res.status(400).json({error: "Please input email and password"});
    };

    try {
        const user = await User.findOne({ email} );
        if (!user ) {
            return res.status(404).json({error: "incorrect email"});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({error: "incorrect password"});
        }

        const token = jwt.sign({ userId: user._id}, JWT_SECRET, {expiresIn: "1hr"});

        res.json({ message: "Login successful", token });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "server error" })
    }
});