const User = require("../models/userModel");

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
    getUsers,
    getUser,
    createUser,
    deleteUser,
    putUser,
    patchUser,
};
