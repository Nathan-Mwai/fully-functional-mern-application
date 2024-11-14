import express from 'express'
import { connectDB } from './db/connectDB.js'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5005

app.use(express.json())
// Allows me to parse incoming requests from req.body
app.use(cookieParser())
// Allows us to parse incoming cookies

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
    
})