const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');
const { setUserRoadmap } = require('../utils/roadmap');

const registerUserController = async (req, res) => {
    const { username, email, password, targetRole } = req.body;

    if(!username || !email || !password || !targetRole){
        return res.status(400).json({
            message: "Please provide all fields are required"
        })
    }

    const isUsernameExists = await userModel.findOne({ username });
    if(isUsernameExists){
        return res.status(400).json({
            message: "A user with this username already exists"
        })
    }

    const isEmailExists = await userModel.findOne({ email });
    if(isEmailExists){
        return res.status(400).json({
            message: "A user with this email id already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        targetRole
    });

    await setUserRoadmap(user._id, targetRole);

    const token = jwt.sign(
        { id: user._id, username: user.username }, 
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            careerRoadmap: user.careerRoadmap,
            _id: user._id,
            targetRole: user.targetRole
        }
    })
}

const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Incorrect password"
        })
    };

    const token = jwt.sign(
        { id: user._id, username: user.username }, 
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: `Welcome back ${user.username}`,
        user: {
            username: user.username,
            careerRoadmap: user.careerRoadmap,
            _id: user._id,
            targetRole: user.targetRole
        }
    })
}

const logoutUserController = async (req, res) => {
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User logged out sucessfully"
    })
}

const getMeController = async (req, res) => {

    if(!req.user) return;

    const user = await userModel.findById(req.user.id).select("-password -__v -email -tasks -inventory -wishlist");

    res.status(200).json({
        message: "User details fetched successfully",
        user
    })
}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController }