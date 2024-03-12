const jwt = require('jsonwebtoken');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };

// User bio
const userBio = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user.bio);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Update user bio
const updateUserBio = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { bio: req.body.bio },
            {
                new: true, 
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
  
// signup user
const  signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signup(username, email, password);
        if (user) {
            const token = createToken(user._id);
            res.status(200).json({ _id: user._id, username, email, token });
        } else {
            return res.status(400).json({ error: "User not created" });
        }
    } catch (error) {
        res.status(400).json({ error: error.stack });
    }
};

// login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ $or: [{ username: username }, { email: username }] });
    if (!user) {
      console.log('No user found with the provided username or email');
      return res.status(401).json({ message: "Authentication failed on user" });
    }

    console.log(`Plain password: ${password}`);
    console.log(`Hashed password: ${user.password}`); 
    console.log('Hashed password: ', await bcrypt.hash(password, saltRounds));  

    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log(`Password match: ${passwordMatch}`);

    if (!passwordMatch) {
      console.log('Provided password does not match the stored password');
      return res.status(401).json({ message: "Authentication failed on password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ message: "Authentication successful", _id: user._id, username: user.username, email: user.email, token });
};

// get my user profile
const getMe = async (req, res, next) => {
    const { authorization } = req.headers
  
    const token = authorization.split(' ')[1];
    try {
      const { _id } = jwt.verify(token, process.env.SECRET);
  
      const user = await User.findOne({ _id }).select('-password');
      res.status(200).json({ user })
    } catch (error) {
      res.status(500).json({ error: error.message })
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
                new: true, 
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
            { new: true }
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
    deleteUser,
    putUser,
    patchUser,
    userBio,
    updateUserBio
};
