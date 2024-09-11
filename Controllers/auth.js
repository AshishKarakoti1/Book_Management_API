const User = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "helloWorld";

async function signUp(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ success: true, message: `Account for ${username} created successfully` });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating account' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const jwtToken = jwt.sign(
            { email: email, _id: user._id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({ success: true, message: 'Logged in successfully', jwtToken });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    signUp,
    login
};
