const express = require('express');
const bcrypt = require('bcrypt');
// Removed jwt require since JWT is no longer needed
const User = require('./models/User');
// adjust path if needed

const router = express.Router();

router.post('/register', async (request, response) => {
    try {
        const { username, email, password } = request.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return response.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        response.status(201).json({ message: "Registration successful" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.post('/login', async (request, response) => {
    try {
        const { usernameOrEmail, password } = request.body;

        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ message: "Invalid password" });
        }

        response.status(200).json({ message: "Login successful" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});



     
