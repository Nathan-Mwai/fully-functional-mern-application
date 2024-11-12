import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signup = async (req,res) => {
    const {email, password, name} = req.body;
    try {
        if(!email || !password || !name) {
            throw new Error("Please provide all fields")
        }

        const userAlreadyExists = await User.findOne({email}) 
        if(userAlreadyExists) {
            throw new Error("User already exists")
        }

        // const hashedPassword = await bcrypt.hash(password, 10)

    } catch (error) {
        res.status(400).json({success:false , message: error.message})
    }
}

export const login = async (req,res) => {
    res.send("login route")
}

export const logout = async (req,res) => {
    res.send("Logout route")
}