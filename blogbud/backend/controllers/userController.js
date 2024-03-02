const jwt = require('jsonwebtoken');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };
  
// signup user
const  signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.signup(username, email, hashedPassword);
        const token = createToken(user._id);
        res.status(200).json({ username, email, token });
    } catch (error) {
        res.status(400).json({ error: error.stack });
    }
};

// login user
const loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
  
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) {
      console.log('No user found with the provided username or email');
      return res.status(401).json({ message: "Authentication failed on user" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Provided password does not match the stored password');
      return res.status(401).json({ message: "Authentication failed on password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ message: "Authentication successful", _id: user._id, username: user.username, email: user.email, token });
};

// get me
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get all users
const getUsers = async (_, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// get a single user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, description} = req.body;
        if (!username || !email) {
            return res.status(400).json({ error: "Username and email are required" });
        }
        const newUser = new User({ username, email, description });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update user using PATCH
const patchUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            {
                new: true, // return updated document
            }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update user using PUT
const putUser = async (req, res) => {
    try {
        const user = await User.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            { new: true }// return updated document
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    signupUser,
    loginUser,
    getMe,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    putUser,
    patchUser,
};
