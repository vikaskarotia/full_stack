import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Errorhander from "../middlewares/error.js";


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })

        if (user) {

            return next(new Errorhander("user already registered", 400));

        }

        const hashedPassword = await bcrypt.hash(password, 10);


        user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECURITY)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 15,
            sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
            secure:process.env.NODE_ENV==="Development"?false:true,

        }).json({
            success: true,
            message: "registered successfully",
            user,


        })

    }
    catch (error) {
        next(error)

    }
}






export const login = async (req, res, next) => {
    try {
        
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password")


    if (!user) {
        return next(new Errorhander("invalid email or password", 404));

    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new Errorhander("invalid email or password", 404));

    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECURITY)

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
        sameSite:process.env.NODE_ENV==="development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,

    }).json({
        success: true,
        message: "login successfully",


    })

    } catch (error) {
        
        next(error)
    }

}

export const getMyprofile = (req, res) => {

    res.status(200).json({
        message: "my profile",
        user: req.user,
    })
}

export const logout = (req, res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    }).json({
        message: "logout successfully",
        success: true,
    })

}