import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

const __dirname = path.resolve();

app.use(express.json());
// Allows me to parse incoming requests from req.body
app.use(cookieParser());
// Allows us to parse incoming cookies

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
