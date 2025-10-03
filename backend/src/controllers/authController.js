import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

export const register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(user) return res.status(400).json({message: "User already exists"});

        const hashed  = await bcrypt.hash(password,saltRounds);
        user = new User({name, email, password: hashed});
        await user.save();
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        res.json({token, user: {id : user._id, name: user.name, email: user.email} });
    } catch (error) {
        res.status(500).send("Server error");
    }
}

export const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid Credentials"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid Credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        res.json({token, user: {id : user._id, name: user.name, email: user.email} });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
}
