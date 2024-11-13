import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("Please provide all fields");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExists);
    
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    //This is the password hashing spot
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verification code
    const verificationToken = generateVerificationToken();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    });

    await user.save()

    //jwt
    generateTokenAndSetCookie(res, user._id);
    
    await sendVerificationEmail(user.email, verificationToken)
    
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user:{
            ...user._doc,
            password: undefined
        }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const {code} = req.body
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()} // Ensures token has not expired
    })

    if(!user){
      return res.status(400).json({success: false, message: "Invalid or expired verification code"})
    }

    user.isVerified = true
    user.verificationToken = undefined // After becoming true the verification code becomes undefined
    user.verificationTokenExpiresAt = undefined // since there is no token this also will have to change
    await user.save()

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user:{
        ...user._doc,
        password: undefined
      }
    }) 

  } catch (error) {
    
  }
}

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  })
};
