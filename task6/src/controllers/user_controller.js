const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt_secret = process.env.JWT_SCERET;


const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already registered" });
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: 'registered successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'internal server error' });
    }


}


const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            email: user.email,
            id: user.id,
        },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Signed in successfully', token, user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    signup,
    signin
};